// Features:
// * Turn exceptions in user code into rejections
//
// Changes:
// * .then() executes onFulfilled and onRejected differently


class ToyPromise4 {

  constructor() {
    this._fulfillmentTasks = [];
    this._rejectionTasks = [];
    this._promiseResult = undefined;
    this._promiseState = 'pending';
    this._alreadyResolved = false; // 锁，让reslove，reject函数失效
  }

  /**
   * 当前Promise,调用
   * @param {*} onFulfilled 
   * @param {*} onRejected 
   */
  then(onFulfilled, onRejected) {
    const resultPromise = new ToyPromise4();

    const fulfillmentTask = () => {
      if (typeof onFulfilled === 'function') {
        this._runReactionSafely(resultPromise, onFulfilled); // [new]
      } else {
        // `onFulfilled` is missing
        // => we must pass on the fulfillment value
        resultPromise.resolve(this._promiseResult);
      }
    };

    const rejectionTask = () => {
      if (typeof onRejected === 'function') {
        this._runReactionSafely(resultPromise, onRejected); // [new]
      } else {
        // `onRejected` is missing
        // => we must pass on the rejection value
        resultPromise.reject(this._promiseResult);
      }
    };

    switch (this._promiseState) {
      case 'pending':
        this._fulfillmentTasks.push(fulfillmentTask);
        this._rejectionTasks.push(rejectionTask);
        break;
      case 'fulfilled':
        addToTaskQueue(fulfillmentTask);
        break;
      case 'rejected':
        addToTaskQueue(rejectionTask);
        break;
      default:
        throw new Error();
    }
    return resultPromise;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
  /**
   * 调用then的fulfilled函数时，进行异常处理
   * @param {*} resultPromise 
   * @param {*} reaction 
   */
  _runReactionSafely(resultPromise, reaction) { // [new]
    try {
      // 这里代表着当前Promise的结束
      const returned = reaction(this._promiseResult);
      // 这里开启新Promise
      resultPromise.resolve(returned);
    } catch (e) {
      resultPromise.reject(e);
    }
  }

  resolve(value) {
    if (this._alreadyResolved) return this;
    this._alreadyResolved = true;

    // Promise fulfilled之后，返回的值为Promise时，需要等待这个Promise来执行，才能执行后面的
    if (isThenable(value)) {
      // Forward fulfillments and rejections from `value` to `this`.
      // The callbacks are always executed asynchronously
      // 这里调用的是then函数的返回结果，新Promise
      value.then(
        (result) => this._doFulfill(result),
        (error) => this._doReject(error));
    } else {
      this._doFulfill(value);
    }

    return this; // enable chaining
  }

  _doFulfill(value) {
    this._promiseState = 'fulfilled';
    this._promiseResult = value;
    this._clearAndEnqueueTasks(this._fulfillmentTasks);
  }

  reject(error) {
    if (this._alreadyResolved) return this;
    this._alreadyResolved = true;
    this._doReject(error);
    return this; // enable chaining
  }
  _doReject(error) {
    this._promiseState = 'rejected';
    this._promiseResult = error;
    this._clearAndEnqueueTasks(this._rejectionTasks);
  }

  _clearAndEnqueueTasks(tasks) {
    this._fulfillmentTasks = undefined;
    this._rejectionTasks = undefined;
    tasks.map(addToTaskQueue);
  }
}

function isThenable(value) {
  return typeof value === 'object' && value !== null
    && typeof value.then === 'function';
}

function addToTaskQueue(task) {
  setTimeout(task, 0);
}

const p = new ToyPromise4()
// 调用resolve时，标识Promise状态为完成
setTimeout(() => {
  p.resolve();
}, 100)


// 这里提前将then回调函数注册进去
p
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err, 'err');
  })
  .then(res => {
    console.log(res);
  });