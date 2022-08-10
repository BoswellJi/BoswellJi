
const vec3One = glMatrix.vec3.create(new Float32Array([1, 2, 3]));
const vec3Two = glMatrix.vec3.create(new Float32Array([1, 2, 3]));
const vec3Three = glMatrix.vec3.create();

// 指定向量
// vec3.add(vec3Three,[1,2,3],[1,2,3]);

// 类型化数组向量
glMatrix.vec3.add(vec3Three, vec3One, vec3Two);

console.log('向量加法：', vec3Three);

const matrix4One = glMatrix.mat4.create([
  1, 2, 3, 4,
  1, 2, 3, 1,
  3, 2, 3, 1,
  2, 1, 2, 3
]);
const matrix4Two = glMatrix.mat4.create([
  1, 2, 3, 4,
  1, 2, 3, 1,
  3, 2, 3, 1,
  2, 1, 2, 3
]);
const matrix4Three = glMatrix.mat4.create();

// 第一个矩阵的行 和 第二个矩阵的列相乘
glMatrix.mat4.multiply(matrix4Three, [
  1, 2, 3, 4,
  1, 2, 3, 1,
  3, 2, 3, 1,
  2, 1, 2, 3
], [
  1, 2, 3, 4,
  1, 2, 3, 1,
  3, 2, 3, 1,
  2, 1, 2, 3
]);

// mat4.multiply(matrix4Three,matrix4One,matrix4Two);

console.log('矩阵乘法:', matrix4Three);

const matrixOrigin = glMatrix.mat4.create([
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
]);
const matrixEmpty = glMatrix.mat4.create();
const matrixTranslate = glMatrix.mat4.translate(matrixEmpty, [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
], [2, 3, 4]);
const matrixTranslateed = glMatrix.mat4.create([
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  2, 3, 4, 1
]);
const vec4One = glMatrix.vec4.create([1,2,3]);
const vec4Two = glMatrix.mat4.multiply(vec4One,matrixTranslateed);

console.log('平移矩阵:', vec4Two);