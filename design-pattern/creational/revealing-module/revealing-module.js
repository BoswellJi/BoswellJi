/**
 * 揭示模块
 * 
 * 1. 使用匿名对象返回我们想要揭示的私有方法
 */

var myRevealingModule = (function () {
 
  var privateVar = "Ben Cherry",
      publicVar = "Hey there!";

  function privateFunction() {
      console.log( "Name:" + privateVar );
  }

  function publicSetName( strName ) {
      privateVar = strName;
  }

  function publicGetName() {
      privateFunction();
  }

  return {
      setName: publicSetName,
      greeting: publicVar,
      getName: publicGetName
  };

})();

myRevealingModule.setName( "Paul Kinlan" );