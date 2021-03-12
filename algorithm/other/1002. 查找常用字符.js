var commonChars = function (A) {
  let first = A[0];
  let arr = [];

  const charArr = first.split('');

  charArr.forEach((char) => {
    let i = 0;

    for (i = 0; i < A.length; i++) {
      if (A[i].indexOf(char) == -1) {
        break;
      }
    }

    // 遍历完成,将匹配到的去掉
    if (i == A.length) {
      for (i = 0; i < A.length; i++) {
        A[i] = A[i].replace(char,'');
      }
      arr.push(char);
    }
  });

  return arr;
};

console.log(commonChars(['abcc', 'bcdd', 'bccc']));