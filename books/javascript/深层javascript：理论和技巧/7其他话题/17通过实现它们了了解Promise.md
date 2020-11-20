<<<<<<< HEAD
*必备知识*
*对于这个章节，你应该粗略的熟悉Promises，但是更多相关的知识在这里还会被回顾到。*

在这个章节中，我们会从不同角度来处理Promises：而不是使用这个api,我们将创建一个简单的Promises实现。这个不同的角度曾经帮助我，很好的了解Promises的意义。

Promise实现是ToyPromise类，为了更容易地理解，它没有完整地匹配api。但是它足够地接近了，仍然能够给我们更深刻地理解Promises是如何工作地。

## 刷新者：Promise的状态

Promise的状态：Promise初始化未开始。如果我们解析它，它会变成完成的，如果我们决绝它，它会变成被拒绝的。

我们从一个简单的Promises状态如何工作开始：

* 一个Promise被初始化为pending
* 如果Promise使用v来resloved,它会变成fulfilled（稍后，我们会看到解析还有reject）.现在v是Promise的完成值。
* 如果Promise使用error来rejected,它会变成rejected。现在e是Promise的拒绝值。

## 版本1：独立的Promise

我们第一个实现是带有最小化的功能的Promise：

* 我们能创建一个Promise
* 我们能解析和拒绝Promise以及我们只能做一次
* 我们能通过then()方法注册响应（回调函数）。注册必须处理正确的事情，不管Promise是否已经被稳定还是没稳定。
* then()函数不支持链式，还不能返回任何东西。

ToyPromise1是一个带有三个原型方法的类：

* ToyPromise1.prototype.resolve(value)
* ToyPromise1.prototype.reject(reason)
* ToyPromise1.prototype.then(onFulfilled, onRejected)

也就是说，reslove和reject是方法（而且，非函数交给构造函数的回调参数)

这是第一个实现如何使用：

```js
// .resolve() before .then()
const tp1 = new ToyPromise1();
tp1.resolve('abc');
tp1.then((value) => {
  assert.equal(value, 'abc');
});
// .then() before .resolve()
const tp2 = new ToyPromise1();
tp2.then((value) => {
  assert.equal(value, 'def');
});
tp2.resolve('def');
```

*Promise中的数据流流程图是可选的*
*流程图的攻击是对Promises如何工作有一个可视化的解释，但是它们是可选的。如果你发现它们很困惑，你可以忽略它们只关注代码*

* then()方法

首先让我们测试then()方法。他应该处理两件事情：

1. 如果Promise仍然在pending，它对onFulfilled和onRejected的调用进行排队。稍后它们被使用，当Promise稳定下来时。
2. 如果Promise已经fulfilled或者rejected,onFulfilled或者onRejected会被马上调用。

```js
then(onFulfilled, onRejected) {
  const fulfillmentTask = () => {
    if (typeof onFulfilled === 'function') {
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
```

之前的代码片段使用下面的助手函数：

```js
function addToTaskQueue(task) {
  setTimeout(task, 0);
}
```

Promise必须始终异步的解决。那是为什么不能直接执行任务的原因，我们添加他们到事件轮询的任务队列中（浏览器，nodejs）。请注意真实的Promiseapi没有使用常规任务（像setTimeout()），它使用的是微任务。他与当前任务紧耦合以及总是在它之后直接执行。

* reslove()方法

.reslove()方法像下面工作：如果Promise已经稳定，它就不会在任何事情了（确保一个Promise只能被处理一次）。否则Promise状态改变为fulfilled以及将结果缓存到this.promiseResult中，下一步，目前所有的实现反应都已经被入队，被调用。

```js
resolve(value) {
  if (this._promiseState !== 'pending') return this;
  this._promiseState = 'fulfilled';
  this._promiseResult = value;
  this._clearAndEnqueueTasks(this._fulfillmentTasks);
  return this; // enable chaining
}
_clearAndEnqueueTasks(tasks) {
  this._fulfillmentTasks = undefined;
  this._rejectionTasks = undefined;
  tasks.map(addToTaskQueue);
}
```

reject()与reslove()相似。

## 版本2：.then()链式调用

我们实现的下一个特性是链锁：我们从实现反应或者拒绝反应中返回一个值可以有下面的then()函数中的完成响应来处理。（在下个版本中，链锁将变得更加有用，因为返回Promise的特殊支持）

下面的案例：

1. 第一then()函数：我们返回完成反应中的值
2. 第二then()函数：我们通过完成反应接收值

```js
new ToyPromise2()
  .resolve('result1')
  .then(x => {
    assert.equal(x, 'result1');
    return 'result2';
  })
  .then(x => {
    assert.equal(x, 'result2');
  });
```

下面的案例：

1. 第一then()函数：我们返回拒绝反应中的值
2. 第二then()函数：我们通过拒绝反应接收值

```js
new ToyPromise2()
  .reject('error1')
  .then(null,
    x => {
      assert.equal(x, 'error1');
      return 'result2';
    })
  .then(x => {
    assert.equal(x, 'result2');
  });
```

## 便利的catch()

新的版本引入了一个方便的catch方法，它让只提供一个拒绝反应更加容易。请注意只提供一个完成响应已经很容易- 我们取消then()函数的第二个参数很简单（看前一个例子）

如果我们使用前一个例子看起来会更好：

```js
new ToyPromise2()
  .reject('error1')
  .catch(x => { // (A)
    assert.equal(x, 'error1');
    return 'result2';
  })
  .then(x => {
    assert.equal(x, 'result2');
  });
```

下面的两个方法调用相同：

```js
.catch(rejectionReaction)
.then(null, rejectionReaction)
```

这是catch()方法如何被实现的：

```js
catch(onRejected) { // [new]
  return this.then(null, onRejected);
}
```

## 取消响应

如果我们省略一个履行反应，新版本也会转发履行，如果我们省略一个拒绝反应，它会转发拒绝。这为什么有用呢？

下面的案例演示传递拒绝：

```js
someAsyncFunction()
  .then(fulfillmentReaction1)
  .then(fulfillmentReaction2)
  .catch(rejectionReaction);
```

rejectionReaction现在可以处理someAsyncFunction()，fulfillmentReaction1，fulfillmentReaction2的拒绝。

下面的案例演示了传递完成：

```js
someAsyncFunction()
  .catch(rejectionReaction)
  .then(fulfillmentReaction);
```

如果someAsyncFunction()拒绝它的Promise，rejectionReaction能修复无论什么错误并且还返回一个完成值，之后由fulfillmentReaction处理。

如果someAsyncFunction()完成它的Promise，fulfillmentReaction还可以处理，因为catch函数会被跳过。

## 实现

这一切在幕后是如何处理的？

* then方法返回一个解析的Promise，无论是返回onFulfilled还是onRejected。
* 如果onFulfilled和onRejected丢失，则将接收到的内容传递给then()返回的Promise。

只要then函数改变：

```js
then(onFulfilled, onRejected) {
  const resultPromise = new ToyPromise2(); // [new]

  const fulfillmentTask = () => {
    if (typeof onFulfilled === 'function') {
      const returned = onFulfilled(this._promiseResult);
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

  ···

  return resultPromise; // [new]
}
```

then函数创建和返回一个新的Promise（方法的第一行和最后一行）。
额外地：

* fulfillmentTask工作不同。这是现在完成之后发生的事情:
  - 如果提供了onFulfilled函数，他会被调用，并且它的结果被用来解析resultPromise
  - 如果没有onFulfilled函数，我们使用当前Promise的完成值来解析resultPromise

* rejectionTask工作不同。这是现在拒绝之后发生的事情：
  - 如果提供了onRejected函数，它会被调用并且它的结果被用来解析resultPromise,请注意resultPromise不是拒绝：我们假设无论有什么问题都被onRejected修复。
  - 如果没有onRejected函数，我们使用当前Promise的拒绝值来决绝resultPromise。


## 版本3：扁平的then()回调函数返回的Promises

* then()方法的回调函数返回Promises

扁平的Promise大部分是关于使得链锁更加方便：如果我们想要从then回调传递值到下一个，我们用这个格式返回它。在那之后，then函数把它放到已经返回的Promise中。

如果我们从then回调中返回一个Promise,这种方式会变得不方便。例如：基于Promise函数的结果：

```js
asyncFunc1()
.then((result1) => {
  assert.equal(result1, 'Result of asyncFunc1()');
  return asyncFunc2(); // (A)
})
.then((result2Promise) => {
  result2Promise
  .then((result2) => { // (B)
    assert.equal(
      result2, 'Result of asyncFunc2()');
  });
});
```

这次，在行A返回的值进入到由then返回的Promise，强迫我们不包裹行B的Promise。如果能代替就好了，行A返回的Promise替换then返回的Promise。目前还不清楚具体如何做到这一点。但是如果它工作，它能让我们像这样编写我们的代码：

```js
asyncFunc1()
.then((result1) => {
  assert.equal(result1, 'Result of asyncFunc1()');
  return asyncFunc2(); // (A)
})
.then((result2) => {
  // result2 is the fulfillment value, not the Promise
  assert.equal(
    result2, 'Result of asyncFunc2()');
});
```

行A中，我们返回了一个Promise。感谢链式的Promise,result2是Promise的完成值，不是Promise本身。

* 扁平使得Promises状态更复杂

*es规格中的扁平化的romise*
*es规格中，扁平化的Promise的细节在Prmise Object节被描述*

Promise Api如何处理扁平化？

如果一个Promise P被使用Promise Q来解析，之后P没有报错Q,P变成了Q:现在状态和P的结算值总是和Q的相同。他使用then方法来帮助我们，因为then()函数解析它返回的Promise和它回调之一的返回值。

P如何变成Q?通过锁定Q:P变成了外部的，不可解析的以及Q的

* 实现扁平的Promises

我们通过这个函数来检测then功能：

```js
function isThenable(value) { // [new]
  return typeof value === 'object' && value !== null
    && typeof value.then === 'function';
}
```

为了实现锁住，我们引入一个新的标识_alreadyResolved,把它设置为true,来无效reslove,reject，例如：

```js
resolve(value) { // [new]
  if (this._alreadyResolved) return this;
  this._alreadyResolved = true;

  if (isThenable(value)) {
    // Forward fulfillments and rejections from `value` to `this`.
    // The callbacks are always executed asynchronously
    value.then(
      (result) => this._doFulfill(result),
      (error) => this._doReject(error));
  } else {
    this._doFulfill(value);
  }

  return this; // enable chaining
}
```

## 版本4：在响应回调中抛出异常

## 版本5：揭示构造函数模式



=======
## 刷新者：Promise的状态

## 版本1：独立的Promise

## 版本2：.then()链式调用

## 便利的catch()

## 取消响应

## 实现

## 版本3：打平从.then()回调返回的Promises

## 版本4：在响应回调中抛出异常

## 版本5：揭示构造函数模式
>>>>>>> e7fe5dee605b871360ea9382e310a5b8ba005f6c
