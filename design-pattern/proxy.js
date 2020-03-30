/**
 * 代理模式: 以自己的方式控制对资源(本体)的访问
 * 本体与代理
 * 
 * 代理: 实现了所有本体的接口(方法,属性)
 * 本体：尺寸较大的类（占内存
 * 本质：对本体的访问进行控制
 */

/**
 * 虚拟代理 (virtual proxy
 */

// 本地构造函数
function Source() { }

Source.prototype = {
  getMoney() { }
};

// 虚拟代理构造函数
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
