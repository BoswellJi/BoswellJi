const fs = require('fs');

const r = fs.readFileSync('E:/BoswellJi/nodejs/file/1.png', {
  encoding: 'utf-8'
});

console.log(r);