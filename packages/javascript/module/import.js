// 静态导入，打包时可以确定的资源
import { test1 } from './test1';

// 动态导入，运行时才确定的资源（做代码分割
const promise = import('./test1.js');

promise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error('rejected:' + err);
  });
