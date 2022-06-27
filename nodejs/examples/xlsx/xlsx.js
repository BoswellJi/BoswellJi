const fs = require('fs');
const XLSX = require('xlsx');

var buf = fs.readFileSync("/BoswellJi/node/base/12.xlsx");
var wb = XLSX.read(buf, {type:'buffer'});

const str = JSON.stringify(wb.Sheets.Sheet1);
fs.writeFileSync('/BoswellJi/node/base/1.json',str)