
function HashTable() {
  this.table = new Array(7);
}

HashTable.prototype = {
  /**
   * 新增散列元素
   * @param {*} data 
   */
  put(k, data) {
    // 生成数组的索引，有时会出现碰撞（就是重复值
    const key = this.simpleHash(k);
    let index = 0;

    if (this.table[key][index] == undefined) {
      this.table[key][index] = data;
    } else {
      while (this.table[key][index] != undefined) {
        ++index;
      }
      this.table[key][index] = data;
    }
  },
  /**
   * 添加散列表元素,使用线性试探法
   * @param {*} key key
   * @param {*} data 值 
   */
  put1(key, data) {
    let pos = this.simpleHash(key);
    // 从生成的位置开始，向下一个一个位置试探
    while(this.table[pos]){
      pos++
    }
    this.table[pos] = data;
  },
  /**
   * 获取散列元素
   * @param {*} key 
   */
  get(key) {
    // 根据散列值进行获取
    return this.table[this.simpleHash(key)];
  },
  /**
   * 遍历散列表
   */
  showDistro() {
    let i = 0;
    let len = this.table.length;

    for (; i < len; i++) {
      if (this.table[i][0] != undefined) {
        console.log(i + ':' + this.table[i]);
      }
    }
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
   * 散列生成器 2(根据) 散列化字符串键
   * @param {*} string 
   * @param {*} arr 
   */
  betterHash(string, arr) {
    const H = 37;
    let total = 0;
    let i = 0;
    let len = string.length;
    for (; i < len; i++) {
      // 质数 * 上一个数的值 + ASCII码 
      total = total + H * total + string.charCodeAt(i);
    }
    total = total % arr.length;
    return parseInt(total);
  },
  /**
   * 开链法： 给每个键元素，设置为数组，称这个数组为链，重复索引的元素放到同一个数组中
   */
  buildChains() {
    for (let i = 0; i < this.table.length; i++) {
      this.table[i] = [];
    }
  }
};

const hash = new HashTable();
// 将每个元素都初始化为数组
hash.buildChains();

hash.put1('565656', 'jmz');
hash.put1('565656', 'jmz1');
hash.put('565656', 'jmz');
hash.put('565656', 'jmz1');

hash.showDistro();
