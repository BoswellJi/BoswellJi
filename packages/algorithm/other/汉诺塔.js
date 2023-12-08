/**
 * 数学归纳法
 * @param {*} num 环数量
 * @param {*} a 柱子a
 * @param {*} b 
 * @param {*} c 
 * 
 * 情况：从a到c，从a到b,从b到c
 * 
 * 条件： 1. 每次只能移动一个环，不能把大环放在小环上
 * 
 */
function fn(num, a, b, c) {
  if (num == 1) {
    console.log(`${num}从${a}到${c}`);
  } else {
    fn(num - 1, a, c, b);
    console.log(`${num}从${a}到${c}`);
    fn(num - 1, b, a, c);
  }
}

fn(4, 'a', 'b', 'c');