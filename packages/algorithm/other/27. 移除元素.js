// https://leetcode-cn.com/problems/remove-element/

var removeElement = function (nums, val) {
  let i = 0;
  let l = 0;
  let len = nums.length;

  for (; i < len; i++) {
    const num = nums[i];
    if (num !== val) {
      nums[l] = nums[i];
      l++;
    }
  }

  return l;
};
const arr = [1, 2, 3, 4, 1, 1, 1];
const len = removeElement(arr, 1);
console.log(len,arr);
