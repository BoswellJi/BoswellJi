/**
 * 命令模式
 * 定义： 封装方法调用的方式
 * 
 * 组件：
 * 1. 客户 （创建命令交给调用者）
 * 2. 调用者 （适当的时候执行命令）
 * 3. 接收者 （接收命令传递的信息进行执行相应操作）
 * 
 * 
 * 1. 提高程序模块化程度
 * 2. 实现取消和状态恢复特性
 * 3. 将使用者与执行者用命令进行隔离 （点击按钮进行处理某事情）  按钮： 使用者    某事情：执行者   隔离者： 命令模式
 */

// const AdCommand = new Interface('AdCommand', ['excute']);

// Ad是接收者类
const Ad = function () { }
Ad.prototype = {
  stop() { 
    console.log('ad stop...');
  },
  start() { 
    console.log('ad start...');
  },
};

// StopAd StartAd 是命令类
const StopAd = function (adObj) {
  this.adObj = adObj;
}
StopAd.prototype = {
  excute() {
    this.adObj.stop();
  }
}

const StartAd = function (adObj) {
  this.adObj = adObj;
}
StartAd.prototype = {
  excute() {
    this.adObj.start();
  }
};

// 生成命令
const ad = new Ad();
const startAdCommand = new StartAd(ad);
const stopAdCommand = new StopAd(ad);

// 使用命令
startAdCommand.excute();
stopAdCommand.excute();




const makeStart = function (adObj) {
  return function () {
    adObj.start();
  };
}

const makeStop = function (adObj) {
  return function () {
    adObj.stop();
  };
}

const SimpleCommand = function (receiver) {
  this.receiver = receiver;
}

SimpleCommand.prototype.excute = function () {
  this.receiver.action();
}

const ComplexCommand = function () {

}

ComplexCommand.prototype = {
  setParameter() { },
  excute() { }
};

// 菜单项
// const Command = new Interface('Command', ['excute']);
// const Composite = new Interface('Composite', ['add', 'remove', 'getChild', 'getElement']);
// const MenuObj = new Interface('MenuObj', ['show']);

const MenuBar = function () {
  this.menus = {};
  this.element = document.createElement('ul');
  this.element.style = 'none';
}

MenuBar.prototype = {
  add(menuObj) {
    this.menus[menuObj.name] = menuObj;
    this.element.appendChild(this.menus[menuObj.name].getElement());
  },
  remove(name) {
    delete this.menus[name];
  },
  getChild(name) {
    return this.menus[name];
  },
  getElement() {
    return this.element;
  },
  show() {
    this.element.style.display = 'block';
    for (let key in this.menus) {
      this.menus[key].show();
    }
  }
};

const MenuCommand = function (action) {
  this.action = action;
}

MenuCommand.prototype = {
  excute() {
    this.action();
  }
};