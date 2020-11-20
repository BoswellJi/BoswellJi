const p = new Promise((reslove, reject) => {
  setTimeout(() => {
    name.a;
    reslove(1);
  }, 0)
});

p
  .then(res => {
    console.log(res);
  })
  .then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err,'self');
  })