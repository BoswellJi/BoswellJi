var buffer = new ArrayBuffer(8);
var dataview = new DataView(buffer);
dataview.setInt8(1);
const num = dataview.getInt8(1);
console.log(num);
