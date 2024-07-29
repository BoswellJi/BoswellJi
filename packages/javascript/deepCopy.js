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

// 使用示例
const original = { a: 1, b: { c: 2 }, d: [3, 4], e: new Date(), f: /abc/ }
const copy = deepClone(original)
console.log(copy)
