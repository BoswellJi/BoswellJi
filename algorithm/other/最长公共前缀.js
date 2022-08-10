function maxPrefixStr() {
  const arr = [ '123456', '123456','123'];
  let maxStr = arr[0];

  for (let i = 1, len = arr.length; i < len; i++) {
    if (arr[i].length < maxStr.length) {
      const arrCopy = arr[i];
      arr[i] = maxStr;
      maxStr = arrCopy ;
    }
    for (let j = 0, jLen = maxStr.length; j < jLen; j++) {
      if (maxStr[j] !== arr[i][j]) {
        maxStr = maxStr(0, j);
      }
    }
  }

  console.log(maxStr);
}

maxPrefixStr();