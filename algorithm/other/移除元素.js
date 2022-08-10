var removeElement = function (nums, val) {
  for (let i = 0, len = nums.length; i < len; i++) {
    if (nums[i] == val) {
      nums.splice(i, 1);
      i--;
    }
  }

  return nums.length;
};

var removeElement = function (nums, val) {
  let num = 0;

  for (let i = 0, len = nums.length; i < len; i++) {
    if (nums[i] != val) {
      nums[num] = nums[i];
      num++;
    }
  }

  return num;
};


const arr = removeElement([3, 2, 2, 3], 3);
console.log(arr);