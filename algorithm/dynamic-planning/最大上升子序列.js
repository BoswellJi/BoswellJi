/**
 * 问题：在给定的数组中，找出，最大的有序上升的子序列（不是必须连续的，每个元素是唯一的）
 */
function getSequence(arr) {
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = ((u + v) / 2) | 0
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}

function getSequence(arr) {
  const charIndexMap = {
    0: 1,
    1: 1,
    2: 1,
    3: 1
  };
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i] < arr[j]) {
        charIndexMap[i]++;
      }
    }
  }
  return charIndexMap;
}

function getSequence(seq) {
  const valueToMax = {};
  let len = seq.length;
  for (let i = 0; i < len; i++) {
    valueToMax[seq[i]] = 1
  }
  let i = len - 1;
  let last = seq[i];
  let prev = seq[i - 1];

  while (typeof prev !== 'undefined') {
    let j = i;
    while (j < len) {
      last = seq[j];
      // 前一个小于后一个
      if (prev < last) {
        // 最后一个元素的序列就可以加1
        let currentMax = valueToMax[last] + 1;
        // 前一个元素序列不为1
        if (valueToMax[prev] !== 1) {
          valueToMax[prev] = valueToMax[prev] > currentMax ? valueToMax[prev] : currentMax;
        } else {
          valueToMax[prev] = currentMax;
        }
      }
      j++;
    }
    i--;
    last = seq[i];
    prev = seq[i-1];
  }

  const lis = []
  i = 1
  while (--len >= 0) {
    const n = seq[len]
    if (valueToMax[n] === i) {
      i++
      lis.unshift(len)
    }
  }

  return lis
}

const result = getSequence([1, 3, 2]);
console.log(result);