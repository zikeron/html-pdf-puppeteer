const express = require('express');
const hbs = require('handlebars');
const fs = require('fs-extra');
const config = require('./config/index');
const puppeteer = require('puppeteer');

const app = express();
app.use(express.json());

const compile = async function (templateName, data) {
  const filePath = `${__dirname}/templates/${templateName}.hbs`;
  const html = await fs.readFile(filePath, 'utf-8');
  return hbs.compile(html)(data);
};

const data = [
  {
    testId: '000000000000000000000003',
    testName: 'Prueba duplicada',
    doctorId: '000000000000000000000008',
    status: 'DONE',
  },
  {
    testId: '000000000000000000000003',
    testName: 'Prueba duplicada',
    doctorId: '000000000000000000000008',
    status: 'DONE',
  },
  {
    testId: 'e5-l2QGl_R0ZHeonwp5fU',
    testName: 'Análisis Sanguineo',
    doctorName: 'José Francisco',
    doctorId: '5e30b94546fc3f5c223c4254',
    status: 'UNDEFINED',
    updatedAt: 1589900537820,
    results: [Object],
  },
];

app.get('/', async (req, res, next) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();

    const content = await compile('results', data);
    await page.setContent(content);
    await page.emulateMedia('screen');
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    res.contentType('application/pdf');
    res.send(pdf);
  } catch (e) {
    console.log(e);
  }
});
const server = app.listen(config.server.port, () => {
  console.log(`Server is listening at http://localhost:${server.address().port}`);
});
