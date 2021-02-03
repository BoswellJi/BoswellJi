function stringUniqueChar(str) {
  const strMap = {};
  const len = str.length;

  for (let i = 0; i < len; i++) {
    if (strMap[str[i]]) {
      strMap[str[i]]++;
    } else {
      strMap[str[i]] = 1;
    }
  }

  console.log(strMap);
  return strMap;
}



stringUniqueChar('BBBoswell');