/**
 * 职责链模式
 * 
 * 存在多种处理数据（请求）的情况
 * 
 * 组件：
 * 1. 发送者 ： 发送者知道链中的第一个接收者，将向这个接收者发送请求
 * 2. 接收者 ： 处理这个请求或者传递给下一个接收者（当没有接收者接收时，请求将从链上离开）
 * 3. 请求
 */

const Publication = new Interface('Publication', ['getIsbn', 'setIsbn', 'getTitle']);

const PublicLibrary = function (books) {
  this.catalog = {};
  for (let i = 0, len = books.length; i < len; i++) {
    this.addBook(books[i]);
  }
}

PublicLibrary.prototype = {
  findBooks(searchString){
    
  }
};