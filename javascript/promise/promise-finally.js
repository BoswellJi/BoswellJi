const promise = new Promise((resloved, reject) => {
  if (1 == 2) {
    resloved('success');
  } else {
    reject('error');
  }
});

promise
  .then((res) => {
    console.log('resloved:' + res);
  })
  .catch((err) => {
    console.error('rejected:' + err);
  })
  .finally(() => {
    console.log('finished');
  });