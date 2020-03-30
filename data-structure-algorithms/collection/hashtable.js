/**
 * 散列表
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



//  散列生成器 1
function simpleHash(data) {
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
}

// 散列生成器 2
function betterHash(string, arr) {
  const H = 37;
  let
    total = 0,
    i = 0,
    len = string.length;
  for (; i < len; i++) {
    total += H * total + string.charCodeAt(i);
  }
  total = total % arr.length;
  return parseInt(total);
}

// 新增散列元素
function put(data) {
  // 生成散列
  const pos = this.simpleHash(data);
  this.table[pos] = data;
}

function showDistro() {
  let
    n = 0,
    i = 0,
    len = this.table.length;
  for (; i < len; i++) {
    if (this.table[i] != undefined) {
      console.log(i + ':' + this.table[i]);
    }
  }
}

function HashTable() {
  this.table = new Array(137);
  this.simpleHash = simpleHash;
  this.showDistro = showDistro;
  this.put = put;
}

const hash = new HashTable();
hash.put('1245453');
hash.showDistro();
