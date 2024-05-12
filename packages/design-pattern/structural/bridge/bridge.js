/**
 * 事件驱动编程中： 绑定事件的元素为具体实现， 处理函数应为抽象，与具体绑定元素进行隔离，使得抽象与具体松耦合
 * 使具体和抽象分离
 */

addEventListener(Element, 'click', getBeerByIdBridge);

/**
 * 可以进行单独的单元测试
 * 没有和其他对象进行紧耦合
 */
function getBeerById(id, callback) {
  asyncRequest('GET', '?id=' + id, function (res) {
    callback(res);
  });
}

/**
 * 用桥接模式将抽象和具体隔离开
 */
function getBeerByIdBridge(e) {
  getBeerById(this.id, function (res) {
    console.log('Request' + beer);
  });
}


const asyncRequest = (function () {
  function handleReadyState(o, callback) {
    const poll = window.setInterval(function () {
      if (o && o.readyState == 4) {
        clearInterval(poll);
        if (callback) {
          callback(o);
        }
      }
    }, 50);
  }

  const getXHR = function () {
    let http;
    try {
      http = new XMLHttpRequest;
      getXHR = function () {
        return new XMLHttpRequest;
      }
    } catch (err) {
      const msxml = [
        'MSXML2.XMLHTTP.3.0'
      ];
      for (let i = 0, len = msxml.length; i < len; i++) {
        try {
          http = new ActiveXObject(msxml[i]);
          getXHR = function () {
            return new ActiveXObject(msxml[i]);
          }
          break;
        } catch (err) {

        }
      }
    }
    return http;
  }

  return function (method, url, callback, postData) {

  }
})();

if (typeof Function.prototype.method !== 'function') {
  Function.prototype.method = function (name, fn) {
    this.prototype[name] = fn;
  }
}

function Test() {

}

Test.method('test1', function () { });