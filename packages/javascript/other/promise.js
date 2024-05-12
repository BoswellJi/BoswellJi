class Promise {
  constructor() {
    this._fulfillmentTasks = [];
    this._rejectionTasks = [];
    this._promiseResult = undefined;
    this._promiseState = 'pending'; // fulfilled,rejected
    this._alreadyResolved = false;
  }

  /**
   * 需要返回一个新Promsie,状态为pending
   * @param {*} onFulfilled 
   * @param {*} onRejected 
   */
  then(onFulfilled, onRejected) {
    const resultPromise = new Promise();

    // 闭包保存
    const fulfillmentTask = () => {
      if (typeof onFulfilled === 'function') {
        this._runReactionSafely(resultPromise, onFulfilled);
      } else {
        resultPromise.reslove(this._promiseResult);
      }
    }

    const rejectionTask = () => {
      if (typeof onRejected === 'function') {
        this._runReactionSafely(resultPromise, onRejected);
      } else {
        resultPromise.reject(this._promiseResult);
      }
    }

    switch (this._promiseState) {
      case 'pending':
        // 每次都是新Promise的属性
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

  _runReactionSafely(resultPromise, reaction) {
    try {
      // then中的返回值，传递给Promse, Promise为初始化的状态
      // 然后直接调用reslove函数执行Promise
      const retured = reaction(this._promiseResult);
      resultPromise.reslove(retured);
    } catch (err) {
      resultPromise.reject(err);
    }
  }

  reslove(value) {
    if (this._alreadyResolved) return this;
    this._alreadyResolved = true;

    if (isThenable(value)) {
      value.then(
        (result) => this._doFulfill(result),
        (error) => this._doReject(error)
      )
    } else {
      this._doFulfill(value);
    }

    return this;
  }

  _doFulfill(value) {
    this._promiseState = 'fulfilled';
    this._promiseResult = value;
    this._clearAndEnqueueTasks(this._fulfillmentTasks);
  }


  reject(error) {
    if (this._promiseState !== 'pending') return this;
    this._promiseResult = error;
    this._promiseState = 'rejected';
    this._clearAndEnqueueTasks(this._rejectionTasks);
    return this;
  }

  _doReject(error) {
    this._promiseState = 'rejected';
    this._promiseResult = error;
    this._clearAndEnqueueTasks(this._rejectionTasks);
  }

  /**
   * catch函数是一个带有rejected函数的then调用
   * @param {*} onRejected 
   */
  catch(onRejected) {
    return this.then(null, onRejected)
  }

  /**
   * 1. 将当前任务清理掉
   * 2. 执行任务
   * @param {*} tasks 
   */
  _clearAndEnqueueTasks(tasks) {
    this._fulfillmentTasks = undefined;
    this._rejectionTasks = undefined;
    tasks.map(addToTaskQueue);
  }
}

function isThenable(value) {
  return typeof value === 'object' && value !== null && typeof value.then === 'function';
}

function addToTaskQueue(task) {
  setTimeout(task, 0);
}

// new Promise()
//   .reslove(2)
// .catch(err => {
//   console.error(err, 'err');
// })
//   .then(res => {
//     console.log(res, 1);
//   })
//   .then(res => {
//     console.log(res, 2);
//   });

// new Promise()
// Promise.reslove()
// Promise.reject()
// 这些方法都是同步函数
// then：只有then中的回调函数才是异步回调

const p = new Promise();

setTimeout(() => {
  p.reslove(1);
}, 100);

// 这个then中的回调都会保存到调用的Promise中
p
  .then(() => {
    name.name;
  })
  // 其他Promise，都是直接调用reslove执行的
  .catch((err) => {
    console.error(err, 'err');
  })
  .then(res => {
    console.log(res);
    return new Promise().reslove(2);
  })
  .then(res => {
    console.log(res);
  })