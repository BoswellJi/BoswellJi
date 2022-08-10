function searchInsert(nums, target) {
  if (nums.length === 0) return 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      return i;
    } else if (nums[0] > target) {
      return 0;
    } else if (nums[nums.length - 1] < target) {
      return nums.length;
    } else if(nums[i-1]<target && nums[i]>target){
      return i;
    }
  }
}

const pos = searchInsert([1, 2, 3, 4, 7], 5);
console.log(pos);