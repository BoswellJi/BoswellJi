/**
 * 遍历字符串，内部遍历子字符串，与当前父字符串中开始的字串进行对比
 * @param {*} n 
 * @param {*} m 
 */
function subStringMatch(n, m) {
  let index;

  for (let i = 0, ilen = n.length; i < ilen; i++) {
    if (ilen - i < m.length) break;

    for (let j = 0, jlen = m.length; j < jlen; j++) {
      if (n[i + j] == m[j]) {
        index = i;
      } else {
        index = undefined;
        break;
      }
    }

    if (typeof index === 'number') break;
  }

  return index;
}

console.log(subStringMatch('1223','23'));