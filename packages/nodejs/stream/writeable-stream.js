/**
 * 可写流： 可写流对象，可以将数据写入可写流对象中；输出
 * 可写流，写出去 process.stdout，向一个可写流中写入数据
 */
const fs = require('fs');
const rs = fs.createReadStream('./data1.txt');
const wss = fs.createWriteStream('./data.txt');
const ReadableStream = require('stream').Readable;


// 可读取得流经过，可写流得处理
// rs.pipe(wss);

const buf = rs.read(0);
console.log( buf.length);
