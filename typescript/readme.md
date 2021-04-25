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