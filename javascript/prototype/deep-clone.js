function deepClone(source) {
  const typeArr = Object.prototype.toString.call(source) === '[object Array]';
  const target = typeArr ? [] : {};

  if (typeArr === true) {
    for (let i = 0, len = source.length; i < len; i++) {
      if (typeof source[i] === 'object') {
        target[i] = deepClone(source[i]);
      } else {
        target[i] = source[i];
      }
    }
  } else {
    for (let key in source) {
      if (typeof source[key] === 'object') {
        target[key] = deepClone(source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  return target;
}

const o = [1, 2, 3, {name:'jmz'}];
const o1 = deepClone(o);
const o2 = deepClone(o);
console.log(o1 === o2,o1,o2,o1[3]===o2[3]);