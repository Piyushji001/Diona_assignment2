const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');
const { dataset1, dataset2 } = require('./data/datasets');

const app = express();
const port = 4000;

// Set up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the form
app.get('/', (req, res) => {
  res.render('form', dataset1);
});

// Route to switch between datasets
app.get('/switch-data', (req, res) => {
  const currentDataset = req.query.current === '1' ? dataset2 : dataset1;
  res.json(currentDataset);
});

// Route to generate PDF
app.get('/generate-pdf', async (req, res) => {
  try {
    // Launch browser with specific args for Windows
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport to A4 size
    await page.setViewport({
      width: 794, // A4 width in pixels at 96 DPI
      height: 1123, // A4 height in pixels at 96 DPI
      deviceScaleFactor: 1,
    });

    // Load the page with the current dataset
    await page.goto(`http://localhost:${port}`, {
      waitUntil: ['networkidle0', 'domcontentloaded', 'load'],
      timeout: 30000
    });

    // Wait for all content to be rendered
    await page.waitForSelector('.page-container', { timeout: 5000 });
    await page.waitForSelector('.progress-table', { timeout: 5000 });
    await page.waitForSelector('.signature-section', { timeout: 5000 });

    // Add a small delay to ensure all animations are complete
    await page.waitForTimeout(500);

    // Generate PDF with proper A4 settings
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      },
      preferCSSPageSize: true
    });

    await browser.close();

    // Send the PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=worker-progress-report.pdf');
    res.send(pdf);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 