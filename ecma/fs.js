// const fs = require('fs');

// const str = fs.readFileSync('./1.xls', 'utf-8');

// fs.readFile('./1.xls',  (err, data) => {
//   console.log(data.toString());
//   fs.writeFile('./2.xls', data, (err) => {

//   })
// })


const count = function (num, current) {
  if (num <= 1) {
    return 1*current;
  } else {
    return count(num - 1, current * num);
  }
}

console.log(count(100,1));