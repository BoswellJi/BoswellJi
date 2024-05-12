/**
 * 
 */

function removeDuplicates(nums) {
  let n = nums.length;
  let slow = 0;
  let fast = 1;

  while (fast < n) {
    if (nums[slow] !== nums[fast]) {
      slow++;
      nums[slow] = nums[fast];
    }
    fast++;
  }
  return slow+1;
}
const arr = removeDuplicates([1,1,2,3,4,5,5,6]);
console.log(arr);
