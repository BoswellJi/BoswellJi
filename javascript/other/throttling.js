function throttling(cb, time) {
  let pre = new Date();

  return () => {
    const cur = new Date();
    // 之间间隔不能小于time
    if (cur - pre < time) return;
    cb.apply(this, arguments);
    pre = new Date();
  }
}

const fn = throttling(() => {
  console.log(2)
}, 100);

fn();
fn();