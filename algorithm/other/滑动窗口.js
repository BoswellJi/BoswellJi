// 子串匹配问题

/**
 * 1. 在字符串S 中找出包含字符串T 的最小子串；
 * 
 * S= 'abcdef'; T= 'ce'; 
 * 
 * 'cde'
 */

function a() {
  const s = 'aghikd';
  const t = 'ik';
  const window = [];

  let left = 0;
  let right = 0;

  while (right < s.length) {
    window[right] = s[right];
    right++;
  }
}

/**
 * 2. 在一个字符串S 中找出包含T 的子串（顺序不需要一致），返回第一个匹配的索引：
 * 
 * S= 'abcbfsacb'; T= 'abc';
 * 
 * [0,6]
 */


 /**
  * 3. 找出一个字符串中没有重复的最长的子串；
  * 
  * S= 'abcdffds';
  * 
  * 'abdcf'
  */