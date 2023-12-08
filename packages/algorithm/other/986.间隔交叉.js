/**
 * 间隔交叉
 * 
 * Input: A = [[0,2],[5,10],[13,23],[24,25]], B = [[1,5],[8,12],[15,24],[25,26]]
Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
Reminder: The inputs and the desired output are lists of Interval objects, and not arrays or lists.
 */

function intervalIntersection(a, b) {
  let i = 0;
  let j = 0;
  let res = [];

  while (i < a.length && j < b.length) {
    let a1 = a[i][0];
    let a2 = a[i][1];
    let b1 = b[i][0];
    let b2 = b[i][1];

    // 这是两个区间交叉的条件
    if (b2 >= a1 && a2 >= b1) {
      res.push([Math.max(a1, b1), Math.min(a2, b2)]);
    }
    if (b2 < a2) {
      j++;
    } else {
      i++;
    }
  }
  return res;
}

/**
 * 1. 对应元素之间找交叉数
 * 2. 两个封闭间隔的交叉是一组要么是空，要么代表封闭间隔的真实值
 * */ 

const result = intervalIntersection(
  [[1, 3], [2, 4], [5, 8], [7, 10]],
  [[2, 4], [3, 6], [7, 9], [8, 11]]
);
console.log(result);