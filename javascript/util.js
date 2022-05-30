/**
 * 对象深拷贝
 * @param {*} oldObj
 */
function deepClone(oldObj) {
  const type = Object.prototype.toString.call(oldObj).slice(8, -1);
  let newObj = null;

  if (type === 'Array') {
    newObj = [];
    for (let i = 0; i < oldObj.length; i++) {
      if (typeof oldObj[i] === 'object') {
        newObj[i] = deepClone(oldObj[i]);
      } else {
        newObj[i] = oldObj[i];
      }
    }
  } else if (type === 'Object') {
    newObj = {};
    for (let key in oldObj) {
      if (typeof oldObj[key] === 'object') {
        newObj[key] = deepClone(oldObj[key]);
      } else {
        newObj[key] = oldObj[key];
      }
    }
  } else if (type === 'Number' || type === 'String' || type === 'Boolean' || type === 'Symbol') {
    newObj = oldObj;
  }

  return newObj;
}

/**
 * 二/十六进制转十进制
 * 思路：整数部分 num * 2/16 （正的索引减一次方），小数部分num * 2/16 （负的索引加一次方）
 * @param {*} num 
 */
function binAndSixthToTen(num, sys) {
  num = String(num);
  const dotIndex = num.indexOf('.');
  let tenIntNum = 0;
  const numMap = {
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15
  };

  if (dotIndex > -1) {
    const [prev, next] = num.split('.');
    const prevLen = prev.length;
    const nextLen = next.length;

    for (let i = 0; i < prevLen; i++) {
      let prevItem = prev[i];
      prevItem = numMap[prevItem] ? numMap[prevItem] : prevItem;
      tenIntNum += prevItem * Math.pow(sys, prevLen - 1 - i);
    }
    for (let i = 0; i < nextLen; i++) {
      let nextItem = next[i];
      nextItem = numMap[nextItem] ? numMap[nextItem] : nextItem;
      tenIntNum += nextItem * Math.pow(sys, -(1 + i));
    }
  } else {
    const len = num.length
    for (let i = 0; i < len; i++) {
      let numItem = num[i];
      numItem = numMap[numItem] ? numMap[numItem] : numItem;
      tenIntNum += numItem * Math.pow(sys, len - 1 - i);
    }
  }

  return tenIntNum;
}

const num1 = binAndSixthToTen('1E', 16);
console.log(num1);

/**
 * 十进制转二/十六进制
 * 思路：整数部分 / 2/16，余数从结束到开始 小数部分 * 2/16, 整数部分从开始到结束
 * @param {*} num 
 */
function tenTobinAndSixth(num, sys) {
  num = String(num);
  const dotIndex = num.indexOf('.');
  let mods = [];

  const numMap = {
    10: 'A',
    11: 'B',
    12: 'C',
    13: 'D',
    14: 'E',
    15: 'F'
  };

  if (dotIndex > -1) {
    let [prev, next] = num.split('.');

    while (prev !== 0) {
      mod = prev % 2;
      mods.push(numMap[mod] ? numMap[mod] : mod);
      prev = parseInt(prev / sys);
    }

    mods.reverse().push('.');

    next = '0.' + next;

    while (next !== 0) {
      let num = next * sys;
      mod = parseInt(num);
      mods.push(numMap[mod] ? numMap[mod] : mod);

      if (mod === 0) {
        break;
      }

      next = num - mod;
    }
  } else {
    while (num !== 0) {
      mod = num % sys;
      mods.push(numMap[mod] ? numMap[mod] : mod);
      num = parseInt(num / sys);
    }

    mods = mods.reverse()
  }

  return mods.join('');
}

const num = tenTobinAndSixth(30, 16);
console.log(num);