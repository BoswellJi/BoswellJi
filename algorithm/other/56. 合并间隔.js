function merge(intervals) {
  if (!intervals) return [];

  intervals.sort((a,b)=>a-b);

  let res = [];
  res.push(intervals[0]);

  for (let i = 0; i < intervals.length; i++) {
    let curr = intervals[i];
    let last = res[-1];
    if (curr[0] <= last[1]) {
      last[1] = Math.max(last[1], curr[1]);
    } else {
      res.push(curr);
    }
  }
  return res;
}

const sum = merge([[1, 2], [2, 3]]);
console.log(sum);