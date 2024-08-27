function trim(str) {
  let start = 0
  let end = str.length - 1

  for (let i = 0; i <= end; i++) {
    if (str[i] === ' ') {
      start++
    } else {
      break
    }
  }

  for (let i = end; i >= start; i--) {
    if (str[i] === ' ') {
      end--
    } else {
      break
    }
  }

  return '1' + str.slice(start , end+1 ) + '1'
}

console.log(trim('  abc  df  '))
