## typescript

## ts项目中使用js代码包

```.d.ts
{
  "compilerOptions":{
    "paths": {
      "fbgraph": [
        "src/type/fbgraph.d.ts"
      ]
    }
  }
}

```

## ts项目中直接使用js代码（从其他地方拷贝到项目中的js代码

```.d.ts
test.js文件的同级目录定义一个test.d.ts文件
```

## 安全代码

* 编译器会告诉你，你的代码隐藏的不安全；有些代码不会再编译时暴露问题，这就导致了运行时问题，这种代码就被称为不安全代码；
* 将失败性编码到类型系统中；