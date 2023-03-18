const http = require('http');

const req = http.request(
  {
    hostname: 'www.t.lvcang.cn',
    path: '/Domestic/GetDomesticLineDetail?LineId=11',
    method: 'post',
    headers: {
      Cookie:
        'ASP.NET_SessionId=in0u15grib22lnqoynntc0wt; Hm_lvt_be8a067db2aab55915dd40e96c971776=1677137029,1677482533,1678674335,1678855116; Hm_lpvt_be8a067db2aab55915dd40e96c971776=1678860661; SessionUserKey=vcY3nLrm8NuMhodTDKaw5gxlTIat8OEra%2f6dhlop%2bG3rFoUsmCpBiMDkp3yITSS94qCPzDiAJnlqIu5sPMq5GuT%2fdkrTXkiyoO6tU9ivV1AhsyO0%2fALf6dpAYx72wkaAXDuMfj1gxU%2f2DOHtIy44wyMqv0MPxBBHoY3y7jB7WLHaY8zULEFfUBKiRTHKRlmDwYniZACYMAjhbpR%2bcDQGziKEqYgstHuWhaUc12wmPpjt6jwCH3t1Kzik1BCYcWIZce5iZkLi7vmoyaTyZLEs7nSPG5M4lIy0Hsw52XBPDnmQ99fWjPWevywWdQiXV9VuLiZdDIwUtPanKFEP77whrps%2faJzBwn1FZBAX%2fkykt6Q%3d',
    },
  },
  (res) => {
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', (err) => {
      console.log(err);
      console.log('No more data in response.');
    });
  }
);

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write('pairID=68&period=300&viewType=normal');
req.end();
