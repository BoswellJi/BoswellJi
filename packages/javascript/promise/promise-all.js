const p1 = new Promise((reslove, reject) => {
  setTimeout(() => {
    reslove(1);
  }, 2000)
}).then(res => {
  return new Promise((reslove)=>{
    setTimeout(()=>{
      reslove('eee')
    },2000);
  });
});

Promise.all([
  p1
]).then((res) => {
  console.log(res);
});
