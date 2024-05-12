``` 
String({
  toString:()=>{ 
    console.log('test'); 
    return 2
  },
  valueOf(){ 
    console.log('test'); 
    return '34'
  }
});
```

* 调用toString,不调用valueOf
* 在跟字符串类型的变量比较时, 调用toString() 所以 { toString(){ return '' }} == '',为true

``` 
Number({
  toString:()=>{ 
    console.log('test'); 
    return 2
  },
  valueOf(){ 
    console.log('test'); 
    return '34'
  }
});
```

* 调用valueOf,不调用toString
* 在跟数值类型的变量比较时, 调用valueOf() 所以 { valueOf(){ return 0 }} == 0,为true

``` 
Boolean({
  toString:()=>{ 
    console.log('test'); 
    return 2
  },
  valueOf(){ 
    console.log('test'); 
    return '34'
  }
});
```

* 不调用任何方法
