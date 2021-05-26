## tokenizer

- 词法分析；
- 接收输入代码，生成`tokens/符号`数组；

## parser

- 语法分析；
- 接收`tokens`,生成`ast/中间表示`;

## transformer

- 接收`ast`，生成`目标语言的ast`；

## codeGenerator

- 根据`目标语言的ast`生成目标语言代码；

## 编译器的三个阶段：

* parsing/语法解析:
  - 词法解析/tokenizer；
  - 语法解析/parser；

* transformation/转换:
* code generation/代码生成: 