function longPrefix(arr) {
  let minStr = arr[0]
  let num = 0

  for (let i = 1; i<arr.length; i++) {
    if (minStr.length > arr[i].length) {
      minStr = arr[i]
    }
  }

  for (let i = 0; i<minStr.length; i++) {
    const res = arr.filter(item => item[i] === minStr[i])
    if (res.length === arr.length) {
      num++
    }else{
      break;
    }
  }

  return minStr.slice(0,num) || ''
}

console.log(longPrefix(['ab', 'abcd', 'abdf','d']))
