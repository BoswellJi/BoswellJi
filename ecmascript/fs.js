const count = function (num) {
  if (num <= 1) {
    return 1;
  } else {
    return count(num - 1) * num;
  }
}

console.log(count(5));