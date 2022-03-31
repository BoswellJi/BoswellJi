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


## 类型操作

* Generics/范型: 传递参数的类型
* Keyof类型操作符：使用keyof操作符来创建新类型
* Typeof类型操作符：使用typeof操作符来创建新类型
* Indexed Access Types 索引访问类型：使用`Type['a']`语法来访问类型的子类型
* Conditional Types 条件类型：在类型系统中行为向if语句`x extends y?true:false`
* Mapped Types 映射类型: 通过在现存类型中映射每个属性来创建类型
* Template Literal Types 模板字面量类型：通过模板字面量字符串改变属性的映射类型

## 工具类型

* Partial<T>
* Required<T>
* Readonly<T>
* Record<K,T>
* Pick<T>
* Omit<T>
* Exclude<T>
* Extract<T>
* NonNullable<T>
* Parameters<T>
* ConstructorParameters<T>
* RetureType<T>
* InstanceType<T>
* ThisParameters<T>
* OmitThisParameters<T>
* ThisType<T>

**字符串的基本操作**
* Uppercase<StringT>
* Lowercase<StringT>
* Capitalize<StringT>
* Uncapitalize<String>
