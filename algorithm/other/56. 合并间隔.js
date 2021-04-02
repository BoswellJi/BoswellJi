/**
 * 间隔合并
 * 使用贪心算法
 * 
 *  Input: [[1,3],[2,6],[8,10],[15,18]]
    Output: [[1,6],[8,10],[15,18]]
    Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].

    [start, end]
 * @param {*} intervals 
 * @returns 
 */

function merge(intervals) {
  if (!intervals) return [];

  // 按照start进行升序排序
  intervals = intervals.sort((a, b) => a[0] - b[0]);

  let res = [];
  res.push(intervals[0]);

  for (let i = 1; i < intervals.length; i++) {
    let curr = intervals[i];
    let last = res[res.length-1];
    // 当前的元素start小于等于上一个元素的end
    if (curr[0] <= last[1]) {
      // 那么上个元素的end和当前元素的end最大值就是当前的合并区间
      last[1] = Math.max(last[1], curr[1]);
    } else {
      res.push(curr);
    }
  }
  return res;
}

const sum = merge([[1, 2], [2, 3],[4,6],[7,9],[8,10]]);
console.log(sum);