function deepClone(obj, map = new WeakMap()) {
  // 处理 null 或非对象
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // 处理循环引用
  if (map.has(obj)) {
    return map.get(obj)
  }

  // 处理不同的对象类型
  let clone
  if (Array.isArray(obj)) {
    clone = []
  } else if (obj instanceof Date) {
    clone = new Date(obj)
  } else if (obj instanceof RegExp) {
    clone = new RegExp(obj)
  } else {
    clone = {}
  }

  // 存储到 WeakMap 以处理循环引用
  map.set(obj, clone)

  // 递归复制对象属性
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], map)
    }
  }

  return clone
}

function deepCopy(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (typeof obj === 'function') {
    return obj
  }

  if (hash.has(obj)) {
    return hash.get(obj)
  }

  if (obj instanceof Date) {
    return new Date(obj)
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj)
  }

  if (obj instanceof Set) {
    const newSet = new Set()
    obj.forEach(value => {
      newSet.add(deepCopy(value, hash))
    })
    return newSet
  }

  if (obj instanceof Map) {
    const newMap = new Map()
    obj.forEach((value, key) => {
      newMap.set(key, deepCopy(value, hash))
    })
    return newMap
  }

  const result = Array.isArray(obj)
    ? []
    : Object.create(Object.getPrototypeOf(obj))
  hash.set(obj, result) // 保留目标对象原型链

  Reflect.ownKeys(obj).forEach(key => {
    result[key] = deepCopy(obj[key], hash)
  })

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepCopy(obj[key], hash)
    }
  }

  return result
}

const original = {
  date: new Date(),
  regex: /test/i,
  set: new Set([1, 2, 3]),
  map: new Map([['key', 'value']])
}

const copied = deepCopy(original)
console.log(copied)
