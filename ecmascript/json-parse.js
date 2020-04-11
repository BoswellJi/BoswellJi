function jsonParse(jsonString) {
  return eval(jsonString);
}

function jsonParse(jsonString) {
  // 参数2: 函数体  参数1: 函数参数
  return new Function('return ' + jsonString)();
}

console.log(jsonParse('{"name":"jmz"}'));