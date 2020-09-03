// 开辟的一片连续内存
const buffer = new ArrayBuffer(8);

// 内存视图（内存中的数据类型，8位，16位，32位等
const dataview = new DataView(buffer);

// TypedArray 视图(无符号8位整型)： 指得是数组中得每个元素都是无符号的8位整型数值
const typedArray = new Uint8Array([256,2]);

// TypedArray 视图（有符号8位整型）： （7位全1的值为：128）
// 1（符号位） 1111111 ： 128
// 1 000 0000 -1 : 01111111

const int8Array = new Int8Array([127]);

// console.log(int8Array,int8Array.BYTES_PER_ELEMENT);

// console.log(Math.pow(2,6)+Math.pow(2,5)+Math.pow(2,4)+Math.pow(2,3)+Math.pow(2,2)+Math.pow(2,1)+Math.pow(2,1));

// 字节序：数值在内存中的表示方式

/**
 * ArrayBuffer 和字符串的相互转换 
 * 1. TextDecoder 解码器
 * 2. TextEnCoder 编码器
 * 
 * @param {*} buffer 
 * @param {*} encoding 
 */
function ab2str(buffer,encoding){
  const decoder = new TextDecoder(encoding);
  return decoder.decode(buffer);
}

/**
 * 将字符串编码位 BufferArray 对象
 * @param {*} text 
 */
function str2ab(text){
  const encoder = new TextEncoder();
  return encoder.encode(text);
}

const abJmz = str2ab('jmz'),
  strJmz = ab2str(abJmz);

console.log(strJmz);