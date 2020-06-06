# 编译器

## 主要部分

- Scanner 扫描器
- Parser 解析器
- Binder 绑定器
- Checker 检查器
- Emitter 发射器

## 编译过程

```使用到的专业词汇
1. Token :  流，单词
2. AST:     抽象语法树
3. Symbols: 符号
```

- SourceCode -> Scanner -> Token 
- Token -> Parser -> AST
- AST -> Binder -> Symbols
- AST + Symbols -> Checker -> 类型验证
- AST + Checker -> Emitter -> js SourceCode