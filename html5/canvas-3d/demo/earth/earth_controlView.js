// 该文件属于www.cnblogs.com/yiyezhai，如有转载请保留这行注释

// 该文件用于根据当前缩放等级和位置创建当前视口下地球表面的模型缓冲区和请求当前应当展示的纹理

var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;

function handleMouseDown(event) {
    mouseDown = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
}

function handleMouseUp(event) {
    mouseDown = false;
}

function handleMouseMove(event) {
    if (mouseDown) {
        var newX = event.clientX;
        var newY = event.clientY;
        var dx = newX - lastMouseX;
        var newRotateMatrix = mat4.create();
        mat4.identity(newRotateMatrix);
        mat4.rotate(newRotateMatrix, degToRad(dx / 10.0), [0, 1, 0]);
        var dy = newY - lastMouseY;
        mat4.rotate(newRotateMatrix, degToRad(dy / 10.0), [1, 0, 0]);
        mat4.multiply(newRotateMatrix, earthRotationMatrix, earthRotationMatrix);

        lastMouseX = newX;
        lastMouseY = newY;
    }
}

var currentPressedKey = [];

function handleKeyDown(event) {
    currentPressedKey[event.keyCode] = true;
    if (event.keyCode == 65) { getBlock(); }
}

function handleKeyUp(event) {
    currentPressedKey[event.keyCode] = false;
}

function initBufferTexture(block) {
    var block = getBlock();
    var theZoom = getZoom(z);
    initBuffers(theZoom, block);
    var url = "mapData/";

    if (theZoom == 1) {
        url += block.toString() + "/";
    }

    url += "i.jpg";

    initTexture(url);
}

function getBlock() {
    var inverseearthRotateMatrix = mat4.create();
    mat4.inverse(earthRotationMatrix, inverseearthRotateMatrix);
    var direction = [];
    mat4.multiplyVec4(inverseearthRotateMatrix, [0, 0, 1, 0], direction);
    var zoom = getZoom(z);
    var tx = direction[0];
    var ty = direction[1];
    var tz = direction[2];
    var phi = 0;
    if (tz >= 0) {
        phi = Math.acos(tx / Math.sqrt(tx * tx + ty * ty));
    }
    else {
        phi = Math.PI + Math.acos(tx / Math.sqrt(tx * tx + ty * ty));
    }
    var theta = -Math.asin(ty / Math.sqrt(tz * tz + tx * tx + ty * ty));
    var pow = Math.pow(2, zoom);
    var iX = parseInt(phi / (2 * Math.PI / pow));
    var iY = parseInt((theta + Math.PI / 2) / (Math.PI / pow));
    return (iX + pow * iY);
}

function getZoom(z) {
    if (z > 3.12) { return 2; }
    if (z <= 3.12 && z >= 2.63) { return 1; }
    if (z < 2.63) { return 0; }
}