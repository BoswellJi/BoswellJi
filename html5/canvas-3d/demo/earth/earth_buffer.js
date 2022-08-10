// 该文件属于www.cnblogs.com/yiyezhai，如有转载请保留这行注释
// 该文件用于根据缩放级别和该缩放级别下的区块创建顶点位置、索引、纹理坐标和法线的缓冲区；文件还用于根据url创建纹理

var earthVertexPositionBuffer;
var earthVertexIndexBuffer;
var earthVertexTextureCoordBuffer;
var earthVertexNormalBuffer;

function initBuffers(zoom, blockIndex) {
    var latitudeBands = 60;
    var longitudeBands = 60;
    var radius = 2;

    // 顶点坐标
    var vertexPositionData = [];
    // 顶点纹理坐标
    var vertexTextureCoordData = [];
    // 法线向量
    var normalData = [];

    var pow = Math.pow(2, zoom);
    var xIndex = blockIndex % pow;
    var yIndex = parseInt(blockIndex / pow);

    var latitudeStart = yIndex * latitudeBands / pow;
    var latitudeEnd = (yIndex + 1) * latitudeBands / pow;
    var longitudeStart = xIndex * longitudeBands / pow;
    var longitudeEnd = (xIndex + 1) * longitudeBands / pow;

    for (var latN = latitudeStart; latN <= latitudeEnd; latN++) {
        var theta = latN * Math.PI / latitudeBands;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);
        for (var lonN = longitudeStart; lonN <= longitudeEnd; lonN++) {
            var phi = lonN * 2 * Math.PI / longitudeBands;
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            var x = cosPhi * sinTheta;
            var y = cosTheta;
            var z = sinPhi * sinTheta;
            var u = 1 - ((latN - latitudeStart) * 1.0 / (longitudeEnd - longitudeStart));
            var v = 1 - ((lonN - longitudeStart) * 1.0 / (latitudeEnd - latitudeStart));

            normalData.push(x);
            normalData.push(y);
            normalData.push(z);
            vertexPositionData.push(radius * x);
            vertexPositionData.push(radius * y);
            vertexPositionData.push(radius * z);
            vertexTextureCoordData.push(v);
            vertexTextureCoordData.push(u);
        }
    }

    // 索引
    var indexData = [];
    for (var latN = latitudeStart; latN < latitudeEnd; latN++) {
        for (var lonN = longitudeStart; lonN < longitudeEnd; lonN++) {
            var first = ((latN - latitudeStart) * (longitudeBands / pow + 1)) + (lonN - longitudeStart);
            var second = first + longitudeBands / pow + 1;

            indexData.push(first);
            indexData.push(second);
            indexData.push(first + 1);

            indexData.push(second);
            indexData.push(second + 1);
            indexData.push(first + 1);
        }
    }

    earthVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, earthVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
    earthVertexPositionBuffer.itemSize = 3;
    earthVertexPositionBuffer.numItems = vertexPositionData.length / 3;

    earthVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, earthVertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexTextureCoordData), gl.STATIC_DRAW);
    earthVertexTextureCoordBuffer.itemSize = 2;
    earthVertexTextureCoordBuffer.numItems = vertexTextureCoordData / 2;

    earthVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, earthVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
    earthVertexIndexBuffer.itemSize = 1;
    earthVertexIndexBuffer.numItems = indexData.length;

    earthVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, earthVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
    earthVertexNormalBuffer.itemSize = 3;
    earthVertexNormalBuffer.numItems = normalData.length / 3;
}

var earthTexture;

function initTexture(url) {
    earthTexture = gl.createTexture();
    earthTexture.image = new Image();
    earthTexture.image.onload = function() { handleLoadedTexture(earthTexture) };
    earthTexture.image.src = url;
}

function handleLoadedTexture(texture) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
}