
var LAST_ERROR = null;
var IS_ERROR = {};

class Promise {

  constructor(fn) {
    this._deferredState = 0;
    this._state = 0;
    this._value = null;
    this._deferreds = null;

    this.doResolve(fn, this);
  }

  doResolve(fn, promise) {
    let done = false;
    let res = this.tryCallTwo(fn, (value) => {
      if (done) return;
      done = true;
      this.resolve(promise, value);
    }, (reason) => {
      if (done) return;
      done = true;
      this.reject(promise, reason);
    });

    if (!done && res === IS_ERROR) {
      done = true;
      this.reject(promise, LAST_ERROR);
    }
  }

  reslove(self, newValue) {
    if (newValue === self) {
      return reject(
        self,
        new TypeError('A promise cannot be resolved with itself.')
      );
    }

    self._state = 1; // 改变状态
    self._value = newValue; // reslove传递的值
    this.finale(self);
  }

  finale(self){

  }

  tryCallTwo(fn, a, b) {
    try {
      fn(a, b);
    } catch (ex) {
      LAST_ERROR = ex;
      return IS_ERROR;
    }
  }

  // then函数是同步的
  then(callback) {
    this.callbacks.push(callback);
    return this;
  }
}

const p = new Promise((reslove, reject) => {
  setTimeout(() => {
    reslove(1);
  }, 0);
});



