var removeDuplicates = function (S) {
  const allWord = [];

  for (const item of S) {
    if (allWord.length && allWord[allWord.length - 1] == item) {
      allWord.pop();
    } else {
      allWord.push(item);
    }
  }
  return allWord.join('');
};

var removeDuplicates = function (S) {
  let allWord = S[0];
  let i = 0;

  while (S.length > i) {
    i++;

    if (allWord[allWord.length - 1] === S[i]) {
      allWord = allWord.slice(0, allWord.length - 1);
    } else if (S.length > i) {
      allWord += S[i];
    }
  }

  return allWord;
};

const allWord = removeDuplicates('abcssddefg');

console.log(allWord);