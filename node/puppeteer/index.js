const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const html = fs.readFileSync('./index.html','utf-8').toString();
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.setContent(html);
    await page.pdf({ 
      path: './hn.pdf', 
      width : '795px',
      height:'1124px',
      displayHeaderFooter:true,
      footerTemplate :`
        <div>BOswell totalPages </div>
      `,
      headerTemplate :'q12222'
    });
  } catch (err) {
    console.error(err);
   }
  await browser.close();
})();