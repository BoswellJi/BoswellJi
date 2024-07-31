function addBigInt(a, b) {
  const aLen = a.length
  const bLen = b.length
  const result = []
  let c = 0

  if (aLen > bLen) {
    b = new Array(aLen - bLen).fill(0).join('') + b
  } else if (bLen > aLen) {
    a = new Array(bLen - aLen).fill(0).join('') + a
  }

  a = a.split('').reverse()
  b = b.split('').reverse()

  for (let i = 0; i < a.length; i++) {
    const num = (Number(a[i]) + Number(b[i]) + c) % 10
    c = Math.floor((Number(a[i]) + Number(b[i])) / 10)
    result.push(num)
  }

  return result.reverse().join('')
}

function addBigInt1(a, b) {
  return BigInt(a) + BigInt(b)
}

console.log(
  addBigInt('1455244555565656556', '1000000000000000') ==
    addBigInt1('1455244555565656556', '1000000000000000')
)
