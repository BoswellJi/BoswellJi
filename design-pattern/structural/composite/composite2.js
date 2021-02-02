/**
 * 组合对象
 * @param {*} id 
 */
function DynamicGallery(id) {
  this.children = [];
  this.element = document.createElement('div');
  this.element.id = id;
  this.element.className = 'dynamic';
}

DynamicGallery.prototype.add = function (child) {
  // 将子节点添加到集合中
  this.children.push(child);
  // 将子元素添加到父元素中
  this.element.appendChild(child.getElement());
}

DynamicGallery.prototype.remove = function () {
  // todo
}

DynamicGallery.prototype.getChild = function (i) {
  return this.children[i];
}

DynamicGallery.prototype.hide = function () {
  //todo
}

DynamicGallery.prototype.show = function () {
  // todo
}

DynamicGallery.prototype.getElement = function () {
  return this.element;
}

function GalleryImage(src) {
  this.element = document.createElement('img');
  this.element.className = 'img';
  this.element.src = src;
}

GalleryImage.prototype = {
  // 叶子节点（对象），没有子节点
  add() { },
  remove() { },
  getChild() { },

  // 实现接口
  hide() {
    this.element.style.display = 'none';
  },
  show() {
    this.element.style.display = 'block';
  },
  getElement() {
    return this.element;
  }
};

const topGallery = new DynamicGallery('box');
topGallery.add(new GalleryImage('https://ssss'));
topGallery.add(new GalleryImage('https://ssss'));

document.body.appendChild(topGallery.getElement());