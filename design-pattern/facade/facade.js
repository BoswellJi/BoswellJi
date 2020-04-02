/**
 * 简化使用，对不同浏览器的事件监听器实现进行兼容，这是门面模式
 * @param {*} el 
 * @param {*} type 
 * @param {*} fn 
 */
function addEvent(el, type, fn) {
  if (typeof window.addEventListener != 'undefined') {
    // 冒泡模式
    el.addEventListener(type, fn, false);
  } else if (typeof window.attachEvent != 'undefined') {
    el.attachEvent(type, fn);
  } else {
    el['on' + type] = fn;
  }
}

Event = {
  getEvent(e) {
    return e || window.event;
  },
  getTarget(e) {
    return e.target || e.srcElement;
  },
  stopPropagation(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
  },
  perventDefault(e) {
    if (e.perventDefault) {
      e.perventDefault();
    } else {
      e.retureValue = false;
    }
  },
  stopEvent(e) {
    this.stopPropagation(e);
    this.perventDefault(e);
  }
};