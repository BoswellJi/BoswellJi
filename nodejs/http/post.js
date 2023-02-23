const http = require('http');

const req = http.request(
  {
    hostname: 'cn.investing.com',
    port: 80,
    path: '/instruments/Service/GetTechincalData',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie:
        'SideBlockUser=a%3A2%3A%7Bs%3A10%3A%22stack_size%22%3Ba%3A1%3A%7Bs%3A11%3A%22last_quotes%22%3Bi%3A8%3B%7Ds%3A6%3A%22stacks%22%3Ba%3A1%3A%7Bs%3A11%3A%22last_quotes%22%3Ba%3A1%3A%7Bi%3A0%3Ba%3A3%3A%7Bs%3A7%3A%22pair_ID%22%3Bs%3A2%3A%2268%22%3Bs%3A10%3A%22pair_title%22%3Bs%3A19%3A%22%E9%BB%84%E9%87%91%E7%8E%B0%E8%B4%A7+%E7%BE%8E%E5%85%83%22%3Bs%3A9%3A%22pair_link%22%3Bs%3A19%3A%22%2Fcurrencies%2Fxau-usd%22%3B%7D%7D%7D%7D; geoC=CN; browser-session-counted=true; user-browser-sessions=1; _gid=GA1.2.1533697153.1677135854; Hm_lvt_a1e3d50107c2a0e021d734fe76f85914=1677135854; PHPSESSID=pfimi555snphs7a2rnfa6k4le2; ab_test_header_bidding=headerBidding_enabled; adBlockerNewUserDomains=1677135901; udid=61bb268e8f48500271d34336b7701cde; g_state={"i_p":1677143204900,"i_l":1}; smd=61bb268e8f48500271d34336b7701cde-1677140148; adsFreeSalePopUp=3; __cf_bm=1OwT3OzmVSxE8bRwrt084Oe7Yj0IpD5pWHp4dELmoAA-1677143021-0-AQt4QHaQZLfJLn21vvD3T2u6Mru/9U4Zl1R0ozpVKq4IiSVFsS69LMTUjkR1FQg71gSDDjWvXHNHAscM4NPMzgM=; cf_chl_rc_m=1; cf_chl_2=bf3e31b1729c84a; cf_clearance=svxMGW.v2vDbU8OhTdNAgdgTg_2dYjXuetsnUEmw1MA-1677143042-0-160; nyxDorf=MzVhNDR8M25mNW5mbiM2NTVmMmlkfTE7MjY%3D; _gat=1; _gat_allSitesTracker=1; invpc=6; outbrain_cid_fetch=true; page_view_count=6; _ga_C4NDLGKVMK=GS1.1.1677140171.2.1.1677143045.60.0.0; _ga=GA1.1.688507874.1677135853; Hm_lpvt_a1e3d50107c2a0e021d734fe76f85914=1677143046',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
      'x-requested-with': 'XMLHttpRequest',
      origin: 'http://cn.investing.com',
      referer: 'http://cn.investing.com/currencies/xau-usd-technical',
      'sec-ch-ua':
        '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': 'Windows',
      'sec-fetch-dest': '',
      'sec-fetch-mode': 'cor',
      'sec-fetch-site': 'same-origin',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
      'x-requested-with': 'XMLHttpRequest',
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
