/**
 * 组合模式中含有：
 *  1. 叶对象
 *  1.1. 组合对象中最基本的单位；
 *    
 *  2. 组合对象
 *  2.1. 实现了一个用来获取其子对象的方法，随心所欲的组织子对象；
 *  2.2. 组合对象与子对象实现了同一批操作；
 *  2.3. 组合对象执行操作，将向下传递给所有子对象；
 * 
 * 使用场景：
 *  1. 存在一批组织成某种层次体系的对象；
 *  2. 希望对这批对象或者其中一部分实施一个操作；
 * 
 * 具体场景：
 *  1. mvc的 view 层实现；
 */

/**
 * 表单对象（根对象（组合对象
 * @param {*} id 
 * @param {*} method 
 * @param {*} action 
 */
function CompositeForm(id, method, action) {
  this.formComponent = [];
  this.element = document.createElement('form');
  this.element.method = method;
  this.element.action = action;
  this.element.id = id;
}

CompositeForm.prototype = {
  add: function (child) {
    this.formComponent.push(child);
    this.element.appendChild(child.getElement());
  },
  remove: function (child) {
    for (let i = 0, len = this.formComponent.length; i < len; i++) {
      if (this.formComponent[i] === child) {
        this.formComponent.splice(i, 1);
        break;
      }
    }
  },
  restore() {
    for (let i = 0, len = this.formComponent.length; i < len; i++) {
      this.formComponent[i].restore();
    }
  }
};


/**
 * 表单域集的组合
 * @param {*} id 
 * @param {*} legendText 
 */
function CompositeFieldSet(id,legendText){
  this.components = {};
  this.element = document.createElement('fieldset');
  this.element.id = id;
  if(legendText){
    this.legend = document.createElement('legend');
    this.legend.appendChild(document.createTextNode(legendText));
    this.element.appendChild(this.legend);
  }
}

CompositeFieldSet.prototype = {
  add(child){
    this.components[child.getElement().id] = child;
    this.element.appendChild(child.getElement());
  },
  remove(child){
    delete this.components[child.getElement().id];
  }
};

/**
 * 表单域抽象类
 * @param {*} id 
 */
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
  },
  restore() {
    this.element.value = getCookie(this.id);
  }
};

/**
 * 单行文本框类
 * @param {*} id 
 * @param {*} label 
 */
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

/**
 * 多行文本框类
 * @param {*} id 
 * @param {*} label 
 */
function TextareaField(id, label) {
  Field.call(this, id);
  this.textarea = document.createElement('textarea');
  this.textarea.id = id;
  this.label = label;
  let labelTextNode = document.createTextNode(label);
  this.label.appendChild(labelTextNode);

  this.element = document.createElement('div');
  this.element.className = 'input-field';
  this.element.appendChild(this.label);
  this.element.appendChild(this.textarea);
}

TextareaField.prototype = {
  getValue() {
    return this.textarea.value;
  },
};

// 表单域组合
const fieldset = new CompositeFieldSet('fieldset');
fieldset.add(new InputField('input1','姓名'));
fieldset.add(new TextareaField('textarea1','简介'));

// 表单组合
const topForm = new CompositeForm('form1', 'get', 'https://wwww');
topForm.add(new InputField('input1', '姓名'));
topForm.add(new InputField('input2', '电话'));

const Composite = new Interface('DynamicGallery', ['add', 'remove', 'getChild', 'hide', 'show', 'getElement']);
const GalleryItem = new Interface('GalleryItem', ['hide', 'show']);