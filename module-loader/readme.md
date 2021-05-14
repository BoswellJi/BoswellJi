## 模块

```js
define(['a','b'],function(a,b){
  
})
```

## 加载

* 执行callback之前，需要加载a,b两个模块

```js
// 第一种
function loadModules(module,exports){
  load((a,b)=>{
    cb(a,b)
  });
}

// 第二种
function require(module){
  load((a)=>{
    module.exports = a;
  });

  // 全部完成
  cb();
}
```