function debounce(cb, time) {
  let timer = null;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb.apply(this, arguments);
    }, time || 200);
  }
}

const a = debounce(() => {
  console.log('jmz');
});

a();
a();
