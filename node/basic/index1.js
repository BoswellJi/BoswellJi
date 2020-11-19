const Promise = require('promise');

const p =new Promise((reslove,reject)=>{
  setTimeout(()=>{
    reslove(1);
  });
});

p.then(res=>{
  console.log(res);
});
