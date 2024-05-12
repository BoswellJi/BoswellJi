function JSONStringify(obj) {
  const type = typeof obj;
  if (type !== 'object' || type === null) {
    if (/string|undefined|function/.test(type)) {
      obj = '"' + obj + '"';
    }
    return String(obj);
  } else {
    const json = [];
    const arr = (obj && obj.constructor === Array);

    for (let k in obj) {
      let v = obj[k];
      let type = typeof v;
      if (/string|undefined|function/.test(type)) {
        v = '"' + v + '"';
      } else if ('object' === type) {
        v = JSONStringify(v);
      }
      json.push((arr ? "" : '"' + k + '":') + String(v));
    }
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
  }
}

console.log(JSONStringify([1,23,'name']));