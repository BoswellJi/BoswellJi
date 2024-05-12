const fs = require('fs');
const PDFParser = require("pdf2json");

const pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
  fs.writeFile("E:/BoswellJi/node/pdf2json/1.json", JSON.stringify(pdfData));
});

pdfParser.loadPDF("E:/BoswellJi/node/pdf2json/1.pdf");