## 原因：

* 谷歌浏览器的字体最小限制为font-size:12px；

## 解决方案：

1. 手机端设置rem为单位：

``` css
html {
    font-size: 100px;
}

.a {
    font-size: 0.1rem；
}
```

2. 使用transform:scale(0.8):

``` css
.a {
    font-size: transform:scale(0.8)；
}
```
