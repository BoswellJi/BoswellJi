## 页面渲染机制

解析html同时解析css,生成render tree **(webkit使用呈现树，gecko使用框架树)**,进行layout **(webkit使用布局，gecko使用重排)**，paint。

所有可以解析的格式都必须对应确定的语法（由词汇和语法规则构成）。这称为与上下文无关的语法。

## 脚本执行机制