/**
 * 指定n个非负的整数代表海拔地图，其中每条的宽度为1，计算下雨后，有多少积水；
 * 
 * [0,1,0,2,1,0,1,3,2,1,2,1]
 * 
 * 暴力破解 备忘录 双指针：三种方式都可以
 * 
 * 思路：i位置存储水的多少，取决于它左右两边最高的列是多高
 */

function trap(height) {
  let n = height.length;
  let ans = 0;

  for (let i = 0; i < n - 1; i++) {
    let rMax = 0;
    let lMax = 0;

    // 找到右边最高的列
    for (let j = i; j < n; j++) {
      rMax = Math.max(rMax, height[j]);
    }
    // 找到左边最高的列
    for (let j = i; j >= 0; j--) {
      lMax = Math.max(lMax, height[j]);
    }
    // 找到左右最高的列中的最低的 - 自身的高度 = 积水的高度
    ans += Math.min(lMax, rMax) - height[i];
  }
  return ans
}

/**
 * 带有备忘录的剪枝优化
 * @param {*} height 
 * @returns 
 */
function trap(height) {
  let n = height.length;
  let ans = 0;
  let lMax = new Array(n);
  let rMax = new Array(n);

  lMax[0] = height[0];
  rMax[n - 1] = height[n - 1];

  // 找出左边最高的
  for (let i = 1; i < n; i++) {
    lMax[i] = Math.max(height[i], lMax[i - 1]);
  }
  // 找出右边最高的
  for (let j = n - 2; j >= 0; j--) {
    rMax[j] = Math.max(rMax[j + 1], height[j]);
  }
  for (let j = 1; j < n - 1; j++) {
    // 找到左右最高的列中的最低的 - 自身的高度 = 积水的高度
    ans += Math.min(lMax[j], rMax[j]) - height[j];
  }
  return ans
}

/**
 * 使用双指针方式
 * @param {*} height 
 */
function trap(height) {
  let n = height.length;
  let ans = 0;
  let left = 0;
  let right = n - 1;
  let lMax = height[0];
  let rMax = height[n-1];

  while (left <= right) {
    lMax = Math.max(lMax, height[left]);
    rMax = Math.max(rMax, height[right]);

    if (lMax < rMax) {
      ans += lMax - height[left];
      left++;
    } else {
      ans += rMax - height[right];
      right--;
    }
  }
  return ans;
}

const result = trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
console.log(result);