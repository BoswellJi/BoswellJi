// 该文件属于www.cnblogs.com/yiyezhai，如有转载请保留这行注释

// 该文件用于控制程序的主流程，webGLStart()函数在窗体加载完成后调用

var z = 0;

function drawScene() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // 透视
    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
    // 身份
    mat4.identity(mvMatrix);
    // 平移
    mat4.translate(mvMatrix, [0.0, 0.0, -6.0 + z]);
    // 相乘
    mat4.multiply(mvMatrix, earthRotationMatrix);

    mvPushMatrix();

    gl.bindBuffer(gl.ARRAY_BUFFER, earthVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, earthVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, earthVertexTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, earthVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, earthVertexNormalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, earthVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, earthTexture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);

    gl.uniform3f(shaderProgram.ambientColorUniform, 1, 1, 1);
    gl.uniform3f(shaderProgram.directionColorUniform, 0, 0, 0);
    
    var adjustDirection = vec3.create();
    vec3.normalize([0.0, 0.0, -1.0], adjustDirection);
    vec3.scale(adjustDirection, -1);
    gl.uniform3fv(shaderProgram.directionUniform, adjustDirection);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, earthVertexIndexBuffer);
    setMatrixUniforms();

    gl.drawElements(gl.TRIANGLES, earthVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0)

    mvPopMatrix();
}

function tick() {
    requestAnimFrame(tick);
    drawScene();
    animate();
}

var lastZ = 0;
function animate() {
    if (currentPressedKey[77] == true)
    { if (z < 4) { z += 0.01; } }
    if (currentPressedKey[78] == true)
    { if (z > -4) { z -= 0.01; } }

    if (lastZ > 2.63 && z < 2.63) {
        var block = getBlock();
        initBufferTexture(block);
    }
    if ((lastZ > 3.12 || lastZ < 2.63) && (z < 3.12 && z > 2.63)) {
        var block = getBlock();
        initBufferTexture(block);
    }
    lastZ = z;
}

function webGLStart() {
    var canvas = document.getElementById("theCanvas");
    initGL(canvas);
    initShaders();
    initBuffers(0, 0);
    initTexture("mapData/i.jpg");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    canvas.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
    document.onmousemove = handleMouseMove;
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
    tick();
}