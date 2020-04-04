let obj = {};

function modityObj(o){

  // 函数名也是变量名
  function testName(){}
  // 等于(预解析时进行提升)
  let testName = function(){};

  testName = 'testNameVarbile';

  o.a = 'a';
}

modityObj(obj);

// testName is not defined
console.log(obj,testName);