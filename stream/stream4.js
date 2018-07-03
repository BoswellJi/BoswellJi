var fs=require('fs');
fs.createReadStream('./1.txt').pipe(process.stdout);