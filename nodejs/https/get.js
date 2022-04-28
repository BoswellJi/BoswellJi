const https = require('https');

// https://scrm.hj.vc/auxC 
// https://kaoyanvip-scrm.intous.com/jump/wxa_url/promotion/683
https.get('https://kaoyanvip-scrm.intous.com/jump/wxa_url/promotion/683', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
});