const qrCode = require('qrcode');
const jsQR = require("jsqr");
const fs = require('fs');
const jimp = require("jimp");

qrCode.toFile(__dirname + '/1.png', 'http', function (err, url) {
  const buffer = fs.readFileSync(__dirname + '/1.png');
  jimp.read(buffer, (err, image) => {
    const code = jsQR(image.bitmap.data, 116, 116);
    console.log(code);
  });
});