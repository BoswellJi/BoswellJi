// 接下来是算法题，给了我一个二叉树，求所有路径中总和最大的那一条路径（这真的是一面吗？之前对于二叉树这一块实在是有点没了解透，只会前中后序遍历，路经总和根本就没有刷过，连印象都没有）。坦白说自己不会，又给了我一道编程题，具体如下：实现一个函数，可以往这个函数里面传入三个参数：1. 要执行的函数；2. 延迟执行的时间（以毫秒为单位）；3. 需要重复执行的次数。这个函数的功能就是调用这个函数之后创建传入三个参数，返回一个新函数，之后往这个新函数里面传在第一次传进去的函数的参数，从而调用第一次传进去的这个函数，重复执行i次，每次执行间隔n毫秒。

function fn(cb, time, count) {
  return function (a) {
    // for (let i = 0; i < count; i++) {
    //   setTimeout(() => {
    //     cb(a)
    //   }, time)
    // }
    let curCount = 0

    ;(function handle() {
      setTimeout(() => {
        cb(a)
        curCount++

        if (count > curCount) {
          handle()
        }
      }, time)
    })()
  }
}

const fn1 = fn(
  a => {
    console.log(a)
  },
  1000,
  2
)

fn1(1)
