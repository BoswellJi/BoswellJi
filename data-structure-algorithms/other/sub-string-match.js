const str = ['df','a', 'b', 'c', 'd'];
const m = ['a', 'b'];
const sourceStr = 'ab';

let substr = '';
let startIndex = 0;

for (let i = 0; i < m.length; i++) {
  for (let j = startIndex; j < str.length; j++) {
    if (str[j] === m[i]) {
      startIndex = j + 1;
      substr += m[i];
      break;
    } else {
      substr = '';
    }
  }

  if(!substr)break;
}

const flag = substr == sourceStr

console.log(flag);