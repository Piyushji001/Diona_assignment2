const express = require('express');
const path = require('path');
const pdf = require('html-pdf');
const fs = require('fs');
const app = express();

// Set up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Import data
const data = require('./data');

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        data: data.dataset1,
        currentDataset: 'dataset1'
    });
});

app.get('/switch-dataset/:dataset', (req, res) => {
    const dataset = req.params.dataset;
    res.render('index', { 
        data: data[dataset],
        currentDataset: dataset
    });
});

app.get('/generate-pdf', (req, res) => {
    const dataset = req.query.dataset || 'dataset1';
    
    // Render the template to HTML
    app.render('index', { 
        data: data[dataset],
        currentDataset: dataset
    }, (err, html) => {
        if (err) return res.send(err);

        // PDF generation options
        const options = {
            format: 'A4',
            border: {
                top: '20mm',
                right: '20mm',
                bottom: '20mm',
                left: '20mm'
            },
            footer: {
                height: '10mm',
                contents: {
                    default: '<div style="text-align: center; font-size: 10px; width: 100%;">' +
                            '<span>Page {{page}} of {{pages}}</span>' +
                            '</div>'
                }
            }
        };

        // Generate PDF
        pdf.create(html, options).toStream((err, stream) => {
            if (err) return res.send(err);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=expense-report.pdf');
            stream.pipe(res);
        });
    });
});

// Function to find an available port
function findAvailablePort(startPort) {
    return new Promise((resolve, reject) => {
        const server = app.listen(startPort, () => {
            const port = server.address().port;
            server.close(() => resolve(port));
        });
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                resolve(findAvailablePort(startPort + 1));
            } else {
                reject(err);
            }
        });
    });
}

// Start server on an available port
const startPort = process.env.PORT || 3000;
findAvailablePort(startPort)
    .then(port => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to start server:', err);
    }); 