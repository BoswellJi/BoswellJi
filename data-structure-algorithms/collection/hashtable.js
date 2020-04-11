/**
 * 散列表(哈希表)
 * 
 * 是指key为哈希值的字典数据结构，不需要手动指定key;
 * 
 * 组件:
 * 1. 散列生成器
 *  1.1. 防止散列重复
 * 2. 新增散列
 * 3. 散列表
 * 4. ...
 * 
 * 优势:
 * 1. 增删获取快
 * 
 * 劣势:
 * 1. 遍历慢
 */
function HashTable() {
  this.table = new Array(137);
}

HashTable.prototype = {
  /**
   * 新增散列元素
   * @param {*} data 
   */
  put(key,data) {
    // 生成散列
    const pos = this.simpleHash(key);
    this.table[pos] = data;
  },
  /**
   * 获取散列元素
   * @param {*} key 
   */
  get(key){
    // 根据散列值进行获取
    return this.table[this.simpleHash(key)];
  },
  /**
   * 散列生成器 1
   */
  showDistro() {
    let i = 0;
    let len = this.table.length;

    for (; i < len; i++) {
      if (this.table[i] != undefined) {
        console.log(i + ':' + this.table[i]);
      }
    }
  },
  /**
   * 获取最大，最小区间的随机数
   * @param {*} min 
   * @param {*} max 
   */
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  /**
   * 散列生成器 1
   * @param {*} data 
   */
  simpleHash(data) {
    let
      total = 0,
      i = 0,
      len = data.length;
    for (; i < len; i++) {
      // 字符的编码
      total += data.charCodeAt(i);
    }
    // 字符编码总和模上散列表长度
    return total % this.table.length;
  },
  /**
   * 散列生成器 2(根据)
   * @param {*} string 
   * @param {*} arr 
   */
  betterHash(string, arr) {
    const H = 37;
    let total = 0;
    let i = 0;
    let len = string.length;
    for (; i < len; i++) {
      total += H * total + string.charCodeAt(i);
    }
    total = total % arr.length;
    return parseInt(total);
  }
};

const hash = new HashTable();
hash.put('565656',90);
hash.showDistro();
