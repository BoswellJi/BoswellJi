## javascript异步模式快速指南

> 原文：[JAVASCRIPT ASYNC PATTERNS QUICK GUIDE](https://www.imaginarycloud.com/blog/asynch-javascript-patterns-guide/) 作者：Joel Reis 原技术博文由 Joel Reis 撰写发布 译者：google翻译 整理：J哥哥 

从Web应用程序到服务器和移动应用程序，从小型程序到大型项目，JavaScript无处不在。这是接受任何项目的主要选择，因为它是2018年，JS是一种更成熟的语言，有一个庞大的社区支持它。

在JavaScript中，所有代码在事件循环上同步运行，事件循环按顺序执行程序的小块。在事件循环中，每次迭代称为“tick”并运行直到队列为空。每个块都有一个“tick”进行处理，在完成后，下一个块开始。对于小型应用程序，这已经足够了，但是当我们开始执行需要更多时间的更重要操作时，例如访问数据库或通过Internet获取数据，我们需要更好的机制来处理它们。

多年来，JS生态系统中出现了模式和库来处理异步编程，例如回调，承诺，生成器，异步/等待，Web工作者和NPM注册表上的包，如async，bluebird，co或RxJS。我将把以下各节专门用于每个部分及其各自的特点。

callback
在JavaScript中，函数是第一类对象，回调只是作为参数传递给另一个函数的函数。也称为高阶函数，只要异步工作完成，就应该调用回调。

    fs.readFile('./imaginary.txt', function(err, result) {
        if (err) {
            return console.error('Error:', err);
        }
        return console.log('Result:', result);
    })

由于回调只是函数，所以运行JavaScript的所有环境都支持它们，从我们的浏览器到运行Node.js的服务器。这种模式虽然简单但功能强大，但却是异步的基础。但是，它也有其缺点。

当项目开始增长并且我们需要开始执行更复杂的代码时，在我们的程序上实现通用解决方案变得更加困难，使得它们更难以阅读和维护。当发生这种情况时，我们开始具有})类似于以下示例中所见的金字塔形状。

    fs.readFile('./imaginary.txt', function(err, imaginaryResult) {
        if (err) {
            return console.error('Error:', err);
        }
        fs.readFile('./cloud.txt', function(err, cloudResult) {
            if (err) {
                return console.error('Error:', err);
            }
            var res = imaginaryResult + cloudResult;
            fs.writeFile('./imaginarycloud.txt', res, function(err) {
                if (error) {
                    return console.log('Error:', err);
                }
                return console.log('Success!');
            })
        })
    })

这通常被称为“Callback Hell”。

然而，回调最糟糕的是控制反转。如果发生这种情况，我们将程序流程序列的控制权交给其他方，使得对其进行适当测试变得困难（甚至不可能！）。

promise
承诺更难掌握，但解决控制问题的倒置。它们比回调慢一点，但作为回报，我们获得了很多可信度。

我们总是可以确定Promise会解决或拒绝，因为它们是围绕可能尚不存在的值的“包装器”。Promise是一种可信赖的机制，它也有助于以更顺序的方式表示异步代码。它们最多只能有一个分辨率值，这意味着Promise总是需要被解决或拒绝。

这就是他们如何解决控制反转的问题。不是通过删除回调，而是通过在处理此问题的包装器上创建机制。

Promise提供更多功能，例如Promise.all（）或Promise.race（）。通过这种操作，我们可以启动多个异步请求，并且只有在所有这些请求都被解析或第一次完成时才继续。此外，我们可以在代码上链接多个Promise，而不会在每个代码之后强制使用新的缩进级别.then()。

    var promise = new Promise(function(resolve, reject) {
        fs.readFile('./imaginarycloud.txt', function(err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
    
    promise.then(function(text) {
        console.log(text);
    }).catch(function(err) {
        console.error('Error:', err);
    });

这提高了代码的可读性，以及程序的可维护性，但并非一切都是完美的。由于此功能处于框架级别，因此有多个实现可能会因行为而异，加上时间和内存的开销成本。

generate
ECMAScript 2015上引入了生成器，它们是我们可以使用和控制迭代器的函数，这意味着函数可以随时暂停和恢复。这是一个强大的工具，当我们想要仅在需要时获取每个值时，而不是一次性获取所有值。这可以通过在JavaScript中添加“yield”一词来实现。

    function* iterate(array) {
        for(var value of array) {
            yield value
        }
    }
    
    var it = iterate(['Imaginary', 'Cloud']);
    it.next();
    it.next();
    it.next();
    
    // RESULT:
    // { value: 'Imaginary', done: false }
    // { value: 'Cloud', done: false }
    // { value: undefined, done: true }

我们可以在这个例子中看到，每个next()我们都会收到一个带有值的对象和一个指示生成器函数是否结束的标志。但是生成器也可以用来控制与其他库结合的异步流，比如co或redux-saga，我将在后面进一步讨论。

async/await
最后，ES2017引入了异步函数，使得在JavaScript中编写和读取异步代码变得更加容易！

它们比最后讨论的模式更清晰，异步函数的返回是一个Promise！这非常强大，因为我们拥有两个世界的优点。正如我们之前所讨论的，Promises在处理复杂的异步操作时是安全的选择，但它们并不像async / await代码那样容易阅读和掌握。

一个缺点是它需要一个像Babel一样的转换工具，因为Async / Await仍然是promises代码的语法糖。

由于结果是Promise并且可以解析/拒绝，因此将await代码包装在try / catch中非常重要。这样我们就能够正确处理异步代码的错误。

    async function() {
        try {
            var result = await fetch('https://imaginaryAPI');
            return result
        } catch (err) {
            return console.error('Error:', err);
        }
    }

web worker
使用Web-worker，可以在不同的线程上运行脚本和函数。这不会影响用户界面的可用性，并且可以在工作人员和主线程之间发送数据。

浏览器上的服务工作者大量用于渐进式Web应用程序。这包括为我们的网站注册Web工作者并决定哪些文件可以缓存，这将使应用程序的使用更快。此外，如果用户处于离线状态，则某些功能仍可用。它们还可用于执行繁重的操作，而不会冻结UI或主JS线程。

NPM libary
还有其他几个库试图解决这些问题，每个库都使用自己的技术。你可以在前面找到一些例子：

异步：这个库很适合处理回调试图解决其中存在的一些问题，以及消除回调地狱问题！在最后的实现中，也可以使用Async / await代码。

    async.waterfall([
        function(callback),
        function(callback),
    ], function(err) {
        console.error('Error:', err);
    });

Bluebird：一个非常高性能的Promises实现，还包括很多额外的功能，如取消，迭代和Promisify！最后一个是使用回调的函数的包装器，为这些函数返回一个Promise。

    var module = require('imaginary-callback-module');
    Promise.promisifyAll(module)
    
    // RESULT:
    // Now we can call .then() on all module functions, yeaaah!

co：用生成器控制异步流。这个库是一个围绕生成器的运行时，它将关键字yield与promises相结合，执行生成器结果并将其作为promise对象返回。

    co(function* () {
        var auth = yield login(username, password);
        return auth;
    }).then(function(result) {
        console.log(result);
    }, function(err) {
        console.error(err);
    });

Redux-saga：React / Redux堆栈的前端库。这是一个Redux中间件，旨在使应用程序副作用更高效，更易于管理，因为它们可以通过Redux操作启动或取消。此实现大量使用生成器来通过Internet获取数据并在我们的网站上应用所需的副作用。

    function* (username, password) {
        try {
            var auth = yield call(login, username, password);
            yield put(someActionToStore(auth));
        } catch (err) {
            console.error('Error:', err);
        }
    }

RxJS：这是Angular应用程序使用的模式，它是一种反应模式。基本上，我们创建一个可观察对象，并订阅我们将收到通知的更改。例如，使用此模式，可以取消订阅和链可观察对象。

    Observable.first().subscribe(function(result) {
        console.log('Result:', result);
    }, function(error) {
        console.error('Error:', error);
    })

结论
对于简单项目，回调是处理异步流的最简单，最简单的方法。在具有适当设置的较大项目中，我会选择异步/等待模式，因为异步性易于阅读，具有自然的错误处理并且没有死亡的金字塔。

这是我们工作中需要的一种语法糖，允许我们编写一个更易读和可维护的程序。

JavaScript继续成为github上最常用的语言，以及其充满活力的社区。这是我们处理异步流程的首选，但除了本指南所描述的结果之外，还有更多方法可以实现相同的结果。总而言之，您可以自行选择最适合您需求的产品。