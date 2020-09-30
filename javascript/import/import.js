const promise = import('./test1.js');

promise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error('rejected:' + err);
  });
