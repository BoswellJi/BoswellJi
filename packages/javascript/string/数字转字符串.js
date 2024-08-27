function numToStr(num) {
  num = num.toString()

  const result = []

  for (let i = num.length; i >= 0; i -= 3) {
    result.push(num.slice(i - 3 < 0 ? 0 : i - 3, i))
  }

  return result.reverse().join(',')
}

function numToStr(num) {
  num = num.toString();
  const result = []
  const top = num.length % 3;

  const head = num.slice(0,top);
  const other = num.slice(top);

  result.push(head);
  for(let i=0;i<other.length;i+=3){
    result.push(other.slice(i,i+3))
  }
  return result.join(',')
}

console.log(numToStr(11234567))