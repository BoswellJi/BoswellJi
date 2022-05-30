/**
 * 3 * (2-6 /(3 -7))
 */

function strToNum(str) {
  let n = 0;
  for (let i = 0; i < str.length; i++) {
    let c = str[i];
    n = 10 * n + (c - '0');
  }

  return n;
}

const num = strToNum('123');
console.log(num);

function calculate(s) {
  function helper(s) {
    const stk = [];

    let num = 0;
    let sign = '+';

    for (let i = 0; i < s.length; i++) {
      let c = s.shift();

      if (!isNaN(Number(c)) && c != ' ') {
        num = 10 * num + (c - '0');
      }

      if(c=='('){
        num = helper(s);
      }

      let pre;

      /**
       * 字符不能为空
       */
      if (isNaN(Number(c)) && c != ' ' || i == s.length - 1) {
        switch (sign) {
          case '+':
            stk.push(num);
            break;
          case '-':
            stk.push(-num);
            break;
          case '*':
            pre = stk[0];
            stk.shift();
            stk.push(pre * num);
            break;
          case '/':
            pre = stk[0];
            stk.shift();
            stk.push(pre / num);
            break;
        }

        sign = c;
        num = 0;
      }

      if(c==')'){
        break;
      }
    }

    let res = 0;

    while (stk.length) {
      res += stk[0];
      stk.shift();
    }

    return res;
  }

  return helper(s.split(''));
}

const sum = calculate('4/(4 *2)');

console.log(sum);