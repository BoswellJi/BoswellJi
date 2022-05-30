/**
 * 编写一个函数计算多个数组的交集，要求结果中的每个元素都是唯一的
 */

function multArrMerge() {
  let arrs = Array.prototype.slice.call(arguments).map(item => Array.from(new Set(item)));
  let shortArr = arrs[0];
  let mergeArr = [];

  // O(n)
  // 找到最短数组
  arrs.forEach((item, index) => {
    if (shortArr.length > item.length) {
      shortArr = item;
    }
  });

  // O(n^2)
  // 收集最短数组中每个元素的交集
  mergeArr = shortArr.map(item => {
    const temp = [];
    arrs.forEach(item1 => {
      if (item1.indexOf(item) > -1) {
        temp.push(item);
      }
    });
    return temp;
  });

  // O(n)
  // 过滤每个数组的交集
  mergeArr = mergeArr.map(item => {
    if (item.length === arrs.length) {
      return item[0];
    }
  }).filter(item => item)

  return mergeArr;
}

function multArrMerge(...arrs) {
  // total 为第一个数组
  return Array.from(new Set(arrs.reduce((total, arr) => {
    return arr.filter(item => total.includes(item));
  })));
}

function multArrMerge(...arrs) {
  arrs = arrs.map(item => Array.from(new Set(item)));
  let targetArr = arrs[0];
  for (let i = 1, len = arrs.length; i < len; i++) {
    if (targetArr.length <= 0) return [];
    targetArr = arrs[i].filter(item => targetArr.includes(item));
  }
  return targetArr;
}

const s = Date.now();
console.log(multArrMerge([1, 2, 3], [1,4, 5, 6]));
const e = Date.now();
console.log(e - s);