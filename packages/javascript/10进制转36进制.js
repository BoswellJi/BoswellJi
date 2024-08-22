const decimalTo36 = (num, base = 36) => {
  const str36 = '0123456789abcdefghijklmnopqrstuvwxyz'
  let result = ''

  while (num > 0) {
    const num1 = num % base
    result = str36[num1] + result
    num = Math.floor(num / base)
  }

  return result
}

console.log(decimalTo36(7, 6))
