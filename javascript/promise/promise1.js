// Features:
// * .then() must work independently if the promise is
// settled either before or after it is called
// * You can only resolve or reject once
class ToyPromise1 {
  constructor() {
    this._fulfillmentTasks = [];
    this._rejectionTasks = [];
    this._promiseResult = undefined;
    this._promiseState = 'pending';
  }
  then(onFulfilled, onRejected) {
    const fulfillmentTask = () => {
      if (typeof onFulfilled === 'function') {
        // then中的回调
        onFulfilled(this._promiseResult);
      }
    };
    const rejectionTask = () => {
      if (typeof onRejected === 'function') {
        onRejected(this._promiseResult);
      }
    };
    switch (this._promiseState) {
      case 'pending':
        // 收集回调函数
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
  }
  resolve(value) {
    // 同一个Promise只能进入一个
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
    // 清空之前其他Promise的回调，保存当前Promise的回调
    this._fulfillmentTasks = undefined;
    this._rejectionTasks = undefined;
    // [].map(item)=>item)
    // 遍历执行
    tasks.map(addToTaskQueue);
  }
}
function addToTaskQueue(task) {
  setTimeout(task, 2000);
}

const p = new ToyPromise1();
// p.resolve('p');
// p.then(res => {
//   console.log(res);
// })

p.reject('error')

p.then(()=>{},(err)=> {
  console.log(err);
})