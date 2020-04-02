// 源对象
function Source() { }

Source.prototype = {
  getMoney() { }
};

// 代理对象
const VirtualProxy = function () {
  this.sourceObj = null;
}

// 将本体延迟到具体方法被调用时候实例化
VirtualProxy.prototype = {
  init() {
    if (this.sourceObj === null) {
      this.sourceObj = new Source();
    }
    return this.sourceObj;
  },
  getMoney(params) {
    this.init();
    this.sourceObj.getMoney(params);
  },
};
