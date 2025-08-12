## flutter

## 渲染流程

- dart层：dart framework

  - 开发层面；

- c++层：c++ engnie：skia, dart runtime, text
  - 渲染层面；
  - dart runtime根据dart层创建element,element tree;
  - 每个节点的render函数调用skia,text的图形api进行绘制;
