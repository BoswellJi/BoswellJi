function twoNumConcat(num1, num2) {
  if (!(num1 instanceof Array)) {
    num1 = []
  }

  if (!(num2 instanceof Array)) {
    num2 = []
  }

  return num1.concat(num2).filter(item => item).sort((a, b) => a - b);
}

function twoNumsMerge(nums1, n, nums2, m) {
  let len1 = n - 1, len2 = m - 1, len = n + m - 1;

  while (len2 > 0) {
    if (len1 < 0) {
      nums1[len--] = nums2[len2--];
      continue;
    }
    nums1[len--] = nums1[len1] >= nums2[len2] ? nums1[len1--] : nums2[len2--];
  }
  return nums1;
}

var merge = function(nums1, m, nums2, n) {
  let len1 = m - 1,
      len2 = n - 1,
      len = m + n - 1
  while(len2 >= 0) {
      if(len1 < 0) {
          nums1[len--] = nums2[len2--]
          continue
      }
      nums1[len--] = nums1[len1] >= nums2[len2] ? nums1[len1--]: nums2[len2--]
  }
  return nums1;
};

console.log(twoNumsMerge([1, 2, 3,7,8,9], 6, [1,2,5,6], 4));