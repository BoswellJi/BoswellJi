/**
 * 组合模式中含有：叶对象和组合对象
 */
function CompositeForm(id, method, action) {
  // 组合对象中包含： 子对象集合，元素自身属性
  this.formComponent = [];
  this.element = document.createElement('form');
  this.element.method = method;
  this.element.action = action;
  this.element.id = id;
}

CompositeForm.prototype.add = function (child) {
  this.formComponent.push(child);
  this.element.appendChild(child.getElement());
}

CompositeForm.prototype.remove = function (child) {
  for (let i = 0, len = this.formComponent.length; i < len; i++) {
    if (this.formComponent[i] === child) {
      this.formComponent.splice(i, 1);
      break;
    }
  }
}

CompositeForm.prototype.getChild = function (i) {
  return this.formComponent[i];
}

CompositeForm.prototype.getElement = function () {
  return this.element;
}

function Field(id) {
  this.id = id;
  this.element;
}

Field.prototype = {
  add() { },
  remove() { },
  getChild() { },

  save() {
    // 根据字段将每一个表单中的值存放到cookie中
    setCookie(this.id, this.getValue());
  },
  getElement() {
    return this.element;
  },
  getValue() {
    throw new Error('');
  }
};

function InputField(id, label) {
  Field.call(this, id);
  this.input = document.createElement('input');
  this.input.id = id;
  this.label = document.createElement('label');
  this.label.appendChild(document.createTextNode(label));

  this.element = document.createElement('div');
  this.element.className = 'input';
  this.element.appendChild(this.label);
  this.element.appendChild(this.input);
}

InputField.prototype = new Field();

InputField.prototype.getValue = function () {
  return this.input.value;
}

const topForm = new CompositeForm('form1', 'get', 'https://wwww');
topForm.add(new InputField('input1', '姓名'));
topForm.add(new InputField('input2', '电话'));



const Composite = new Interface('DynamicGallery', ['add', 'remove', 'getChild', 'hide', 'show', 'getElement']);
const GalleryItem = new Interface('GalleryItem', ['hide', 'show']);

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