2. WeakMap的key是弱保存的

WeakMap的key据说是弱保存的：通常，如果一个对象引用了另一个，后一个对象不能被垃圾回收只要之前的还存在。使用WeakMap,就会不同：如果一个对象是Key而且没有在其他地方被引用，它会被垃圾回收，同时WeakMap仍然存在。还导致响应的入口被移除（但是，没有监听它的方式）。

2.1. 所有的WeakMap的key必须是对象

所有的WeakMap的key必须是对象。如果你使用原始值会获得一个错误。

```js
> const wm = new WeakMap();
> wm.set(123, 'test')
TypeError: Invalid value used as weak map key
```

使用原始值作为key，weakMap不再是黑盒。但是指定的原始值不会被垃圾回收，你不能从弱保存key中获得好处，并且只是和普通Map一样使用。

2.2 使用案例：把值放到对象中

这个是WeakMap的主要使用案例：你能使用它们把外部的值连接到对象。例如：

```js
const wm = new WeakMap();
{
  const obj = {};
  wm.set(obj, 'attachedValue'); // (A)
}
// (B)
```

在行A处，我们把一个值连接到obj。在行B处，obj已经能够被垃圾回收了，即使wm仍然存在。这个连接值到对象的技巧是等价于被存储在外部的对象的属性。如果wm是一个属性，之前的代码看起来，如下：

```js
{
  const obj = {};
  obj.wm = 'attachedValue';
}
```

3. 案例

3.1. 通过WeakMaps缓存计算结果

使用WeakMaps，你可以使用对象关联之前的计算结果而不必担心内存管理。下面的countOwnKeys()是一个案例：它缓存之前的结果在WeakMap中cache.

```js
const cache = new WeakMap();
function countOwnKeys(obj) {
  if (cache.has(obj)) {
    return [cache.get(obj), 'cached'];
  } else {
    const count = Object.keys(obj).length;
    cache.set(obj, count);
    return [count, 'computed'];
  }
}
```

如果我们对对象obj使用这个函数，你能看到计算的结果还是第一次调用的，同时缓存值被用在第二次调用中。

```js
> const obj = { foo: 1, bar: 2};
> countOwnKeys(obj)
[2, 'computed']
> countOwnKeys(obj)
[2, 'cached']
```

3.2. 在WeakMap中保持私有数据

接下来的代码，WeakMap_counter和_action被用来存储Countdown实例属性的值。

```js
const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

// The two pseudo-properties are truly private:
assert.deepEqual(
  Object.keys(new Countdown()),
  []);
```

这是Countdown如何使用：

```js
let invoked = false;

const cd = new Countdown(3, () => invoked = true);

cd.dec(); assert.equal(invoked, false);
cd.dec(); assert.equal(invoked, false);
cd.dec(); assert.equal(invoked, true);
```