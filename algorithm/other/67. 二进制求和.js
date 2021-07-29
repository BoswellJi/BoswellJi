// https://leetcode-cn.com/problems/add-binary/
var addBinary = function (a, b) {
  a = a.split();
  b = b.split();

  const maxLenEl = a.length > b.length ? a : b;
  let bLen = b.length-1;

  for (let i = maxLenEl.length - 1; i >= 0; i--) {
    const el1 = maxLenEl[i];
    const el2 = b[bLen--];
    const sum = (+ el1) + (+ el2);

    if(sum !== 2){
      continue;
    }else{
      maxLenEl[i] = 0;
      
    }
  }
};

const sum = addBinary('11', '1');
console.log(sum);