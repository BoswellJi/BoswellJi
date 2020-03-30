/**
 * 命令模式
 * 
 * 1. 提高程序模块化程度
 * 2. 实现取消和状态恢复特性
 */

const AdCommand = new Interface('AdCommand', ['excute']);

const StopAd = function (adObj) {
  this.adObj = adObj;
}
StopAd.prototype = {
  excute() {
    this.adObj.stop();
  }
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
const Command = new Interface('Command', ['excute']);
const Composite = new Interface('Composite', ['add', 'remove', 'getChild', 'getElement']);
const MenuObj = new Interface('MenuObj', ['show']);

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

const MenuCommand = function(action){
  this.action = action;
}

MenuCommand.prototype = {
  excute(){
    this.action();
  }
};