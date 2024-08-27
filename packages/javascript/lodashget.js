function lodashGet(obj, key) {
  const keys = Array.isArray(key)? key : key.split('.')
  let tempObj = obj

  for (let i = 0; i < keys.length; i++) {
    if (tempObj[keys[i]]) {
      tempObj = tempObj[keys[i]]
    }else{
      tempObj = undefined
    }
  }

  return tempObj;
}

console.log(lodashGet({ a: { b: { c: 'c' } } }, 'a.b.d'))
