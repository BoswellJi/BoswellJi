/**
 * 单调栈
 * 
 * 1. 用来处理，查找下一个更大的元素的问题；
 * 
 * 实例：
 * 
 * [2,1,2,4,3] => [4,2,4,-1,-1]
 * 
 * 每个数字后面比当前数字大的是谁，没有返回-1
 */

function nextGreaterElement(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let j = i + 1;
    for (; j < arr.length; j++) {
      if (arr[i] < arr[j]) {
        result.push(arr[j]);
        break;
      }
    }
    if (j == arr.length) {
      result.push(-1);
    }
  }
  return result;
}

function nextGreaterElement(nums) {
  let s = nums;
  let ans = nums;

  for (let i = nums.length-1; i >= 0; i--) {
    while (!s.length && s.shift() <= nums[i]) {
      s.pop();
    }
    ans[i] = s.length ? -1 : s[0];
    s.push(nums[i]);
  }
  return ans;
}

const result = nextGreaterElement(
  [1, 2, 4]
);
console.log(result);