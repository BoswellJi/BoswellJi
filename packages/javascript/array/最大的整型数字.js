// 一个字符串数组：["78","4","45","99"]组成一个最大的整型数字输出出来

function max(arr) {

  arr.sort((a, b) => b + a - (a + b))

  return arr.join('')
}

console.log(max(['78', '4', '445', '99']))
