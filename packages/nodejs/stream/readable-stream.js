/**
 * 可读流：可以从可读流中，读取数据  输入
 * 可读流==数据， 流动在管道中，经过管道中的操作进行处理
 * 
 * 1. process.stdin 是一个可读流对象
 * 2. pipe方法是流处理的管道
 */
const fs = require('fs');

// 创建可读流
const rss = fs.createReadStream('./data.txt');
// 将可读流放进可写流，进行写入
rss.pipe(process.stdout);