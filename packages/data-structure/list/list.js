/**
 * 列表数据结构
 * 1. 设计抽象数据类型
 * 2. 列表的定义，包括拥有的属性，操作
 */

function List() {
  this.listSize = 0;
  this.pos = 0;
  this.dataStore = [];
}

List.prototype = {
  clear() {
    this.listSize = 0;
    this.pos = 0;
    this.dataStore = [];
  },
  find(item) {
    for (let i = 0; i < this.listSize; i++) {
      if (item === this.dataStore[i]) {
        return i;
      }
    }
    return -1;
  },
  toString() {
    return this.dataStore;
  },
  insert(item, index) {
    this.listSize++;
    this.dataStore.splice(index, 0, item);
  },
  append(item) {
    this.dataStore.push(item);
  },
  remove(item) {
    const index = this.find(item);
    if (index > -1) {
      this.listSize--;
      this.dataStore.splice(index, 1);
      return true;
    }
    return false;
  },
  front() {
    this.pos = 0;
  },
  end() {
    this.pos = this.listSize - 1;
  },
  prev() {
    if (this.pos > 0) {
      this.pos--;
    }
  },
  next() {
    if (this.pos < this.listSize - 1) {
      this.pos++;
    }
  },
  length() {
    return this.listSize;
  },
  currentPos() {
    return this.pos;
  },
  moveTo(pos) {
    this.pos = pos;
  },
  getElement() {
    return this.dataStore[this.pos];
  },
  contains(item) {
    const index = this.find(item);
    return index > -1;
  }
};