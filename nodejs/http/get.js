const http = require('node:http');

// https://scrm.hj.vc/auxC
// https://kaoyanvip-scrm.intous.com/jump/wxa_url/promotion/683
http
  .get(
    'http://git.17usoft.com/apprd/tcwireless-demo-admin/blob/master/src/main/webapp/README.md?format=json&viewer=rich',
    {
      headers: {
        Cookie:
          'sidebar_collapsed=false; remember_user_token=W1s1NjU2XSwiJDJhJDEwJHY2dXdHcU03MnpXenRWTHcxdFlHLy4iLCIxNjc2ODgwMjUyLjkzOTAyNiJd--51853097fc91d7ac1c50c49f34b99e77b3c964cb; _gitlab_session=5ad633f59b53ac776775b92e9c3b76ec; __tctmc=102596417.93733272; __tctmd=102596417.128401801; __tctmu=102596417.0.0; __tctmz=102596417.1677117728925.78.1.utmccn=(direct)|utmcsr=(direct)|utmcmd=(none); longKey=1659926379928903; __tctrack=0; __tctma=102596417.1659926379928903.1659926379253.1677117728925.1677120704395.79',
      },
    },
    (res) => {
      console.log('statusCode:', res.statusCode);
      console.log('headers:', res.headers);

      res.on('data', (d) => {
        process.stdout.write(d);
      });
    }
  )
  .on('error', (e) => {
    console.error(e);
  });
