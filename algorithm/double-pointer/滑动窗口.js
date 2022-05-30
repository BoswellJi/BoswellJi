/**
 * 最小化子串窗口
 * 
 * 其中有字符串T的所有字符
 */

function minWindow(s, t) {
  let start = 0;
  let minLen = 100;
  let left = 0;
  let right = 0;

  const window = {};
  const needs = {};

  for (let char of t) {
    needs[char] = 1;
    window[char] = 0;
  }

  let match = 0;

  // 移动右指针到包含字符串t中的所有字符为止
  while (right < s.length) {
    let c = s[right];

    if (needs[c]) {
      window[c]++;

      if (window[c] == needs[c]) {
        match++;
      }
    }

    right++;

    while (match == Object.keys(needs).length) {
      if (right - left < minLen) {
        start = left;
        minLen = right - left;
      }

      let c = s[left];

      if (needs[c]) {
        window[c]--;

        if (window[c] < needs[c]) {
          match--;
        }
      }

      left++;
    }
  }

  return s.substr(start, minLen);
}

const str = minWindow('123674356', '35');
console.log(str, 'test');


/**
 * 在一个字符串中，找到另一个字符串的全部匹配，返回第一个匹配到的字符的索引
 */

function findAnagrams(s, t) {
  let left = 0;
  let right = 0;

  const res = [];
  const window = {};
  const needs = {};

  for (let char of t) {
    needs[char] = 1;
    window[char] = 0;
  }

  let match = 0;

  // 移动右指针到包含字符串t中的所有字符为止
  while (right < s.length) {
    let c = s[right];

    if (needs[c]) {
      window[c]++;

      if (window[c] == needs[c]) {
        match++;
      }
    }

    right++;

    while (match == Object.keys(needs).length) {
      if (right - left === t.length) {
        res.push(left);
      }

      let c = s[left];

      if (needs[c]) {
        window[c]--;

        if (window[c] < needs[c]) {
          match--;
        }
      }

      left++;
    }
  }

  return res;
}

const str1 = findAnagrams('12353674356', '35');
console.log(str1, 'test');

/**
 * 不重复字符的最长子串
 */

function lengthOfLongestSubstring(s) {
  let left = 0;
  let right = 0;
  let res = 0;

  const window = {};

  for (let char of s) {
    window[char] = 0;
  }

  while (right < s.length) {
    let c = s[right];
    window[c]++;
    right++;

    while(window[c]>1){
      let c = s[left];
      window[c]--;
      left++;
    }

    res = Math.max(res,right-left);
  }

  return res;
}

const max = lengthOfLongestSubstring('abccsddefsddjmzdd');
console.log(max);