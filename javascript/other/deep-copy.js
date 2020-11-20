function deepCopy(obj) {
  let result;
  if (obj instanceof Array) {
    result = [];
    obj.forEach((item, index) => {
      if (typeof item === 'object') {
        result[index] = deepCopy(item);
      } else {
        result[index] = obj[index];
      }
    });
  } else if (obj instanceof Object) {
    result = {};
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object') {
        result[key] = deepCopy(obj[key]);
      } else {
        result[key] = obj[key];
      }
    });
  } else {
    result = obj;
  }
  return result;
}

const info = { name: 'jmz', person: { name: 'hhh' }, list: [{ name: 'jmz' }, 2, 3] };

const info1 = deepCopy(info);
const info2 = deepCopy(info);

console.log(info1.list[0] === info2.list[0]);