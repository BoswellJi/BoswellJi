// New features:
// * .then() returns a promise, which fulfills with what
// either onFulfilled or onRejected return
// * Missing onFulfilled and onRejected pass on what they receive
// * New convenience method .catch()
//
// Changes:
// * Several locations inside .then()
class ToyPromise2 {
  // _fulfillmentTasks = []; // 成功函数
  // _rejectionTasks = []; // 失败函数
  // _promiseResult = undefined; // Promise结果
  // _promiseState = 'pending'; // Promise状态
  constructor() {
    this._fulfillmentTasks = [];
    this._rejectionTasks = [];
    this._promiseResult = undefined;
    this._promiseState = 'pending';
  }
  /**
   * 每个then返回的是新Promise
   * @param {*} onFulfilled 
   * @param {*} onRejected 
   */
  then(onFulfilled, onRejected) {
    // 下一个Promise
    const resultPromise = new ToyPromise2(); // [new]
    const fulfillmentTask = () => {
      if (typeof onFulfilled === 'function') {
        // 直接获取
        const returned = onFulfilled(this._promiseResult);
        // 让Promise接下去
        resultPromise.resolve(returned); // [new]
      } else { // [new]
        // `onFulfilled` is missing
        // => we must pass on the fulfillment value
        resultPromise.resolve(this._promiseResult);
      }
    };
    const rejectionTask = () => {
      if (typeof onRejected === 'function') {
        const returned = onRejected(this._promiseResult);
        resultPromise.resolve(returned); // [new]
      } else { // [new]
        // `onRejected` is missing
        // => we must pass on the rejection value
        resultPromise.reject(this._promiseResult);
      }
    };
    // 从第二个Promise开始状态都为pending
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
    return resultPromise; // [new]
  }
  catch(onRejected) { // [new]
    return this.then(null, onRejected);
  }
  /**
   * 这里是Promise的异步任务结束，需要改变Promise状态（从pending->fufilled）
   * @param {*} value 
   */
  resolve(value) {
    // 这里把第一个Promise的状态结束掉，所以导致第一个then直接调用执行
    if (this._promiseState !== 'pending') return this;
    this._promiseState = 'fulfilled';
    this._promiseResult = value;
    this._clearAndEnqueueTasks(this._fulfillmentTasks);
    return this; // enable chaining
  }
  reject(error) {
    if (this._promiseState !== 'pending') return this;
    this._promiseState = 'rejected';
    this._promiseResult = error;
    this._clearAndEnqueueTasks(this._rejectionTasks);
    return this; // enable chaining
  }
  _clearAndEnqueueTasks(tasks) {
    this._fulfillmentTasks = undefined;
    this._rejectionTasks = undefined;
    tasks.map(addToTaskQueue);
  }
}
function addToTaskQueue(task) {
  // 因为这里是异步的，所以
  setTimeout(task, 1000);
}

const p = new ToyPromise2();
p
  .resolve('p')
  // 为当前实例化的Promise,直接返回新的Promise,不是异步的
  .then(res => {
    console.log(res);
    return new ToyPromise2().resolve('1');
  })
  // 为前一个then返回的Promise的方法
  .then(res => {
    console.log(res);
  })
  // 为前一个then返回的Promise的方法
  .then(res => {
    console.log(res);
  })

  // 第一个Promise的then被直接异步调用

  // 因为第一个then回调被异步调用，其他then函数，只能先把回调，添加到自己的Promise中

  // 当第一个then回调开始执行时，将第二个Promise开始激活，第二个Promise激活第三个...