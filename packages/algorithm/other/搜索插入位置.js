var searchInsert = function (nums, target) {
  let index = 0;
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    if (nums[i] == target) {
      return i;
    } else if (nums[i] > target) {
      return i;
    } else {
      index = i;
    }
  }
  return len;
};

const index = searchInsert([1, 2, 3, 32], 3);

console.log(index);