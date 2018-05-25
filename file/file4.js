var ejs = require('ejs');
var fs = require('fs');
// var temp = fs.readFileSync('./test1.ejs', 'utf8');
var temp='<%=name %>';
var content = { name: 'jmz' };
var html = ejs.render(temp, { locals: content });
console.log(html);