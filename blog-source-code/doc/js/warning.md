## 对象的遍历?

- for ... in: 自身属性以及继承来的属性，你可以使用 obj.hasOwnProperty(key)来检查；
- Object.keys(obj): 只会列出可枚举的属性；
- Object.getOwnPropertyName(): 列出可枚举和不可枚举的属性；

## 浮点数计算?

- 不要相信所有 js 的浮点数计算；
