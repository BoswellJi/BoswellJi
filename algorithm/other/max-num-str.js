function maxNumStr(value) {
  const map = {};
  const arrStr = value.split('');
  let max = 0;

  arrStr.forEach(item => {
    if (!map[item]) {
      map[item] = 1;
    } else {
      map[item]++;
    }
  });

  for (let key in map) {
    if (map[key] > max) {
      max = map[key];
    }
  }

  return max;
}

console.log(maxNumStr('abcdbdsdwddf'));