# Medical and Travel Expense Request Form

This project implements a medical and travel expense request form that mimics a PDF form layout. It allows users to view and switch between different datasets, and generate PDF reports.

## Features

- Pug template-based rendering
- Responsive design that matches the PDF form layout
- Support for multiple datasets with easy switching
- PDF generation with proper A4 sizing and page breaks
- Currency formatting
- Print-friendly layout

## Project Structure

```
.
├── views/
│   ├── layout.pug      # Main layout template
│   ├── index.pug       # Main form template
│   └── mixins.pug      # Reusable Pug mixins
├── public/
│   ├── css/
│   │   └── style.css   # Styles for the form
│   └── js/
│       └── script.js   # Client-side JavaScript
├── data.js             # Sample datasets
├── app.js             # Express application
└── package.json       # Project dependencies
```

## Setup and Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   node app.js
   ```

3. Access the application at `http://localhost:3000`

## Usage

- View the form with the current dataset
- Switch between datasets using the "Switch Dataset" button
- Generate a PDF report using the "Generate PDF" button
- The generated PDF will maintain proper A4 sizing and include page numbers

## Technical Details

- Built with Express.js and Pug templates
- Uses html-pdf for PDF generation
- Implements responsive design with CSS
- Supports proper page breaks for PDF generation
- Uses mixins for code reusability
- Implements currency formatting

## Dependencies

- express
- pug
- html-pdf

## Notes

- The application uses two sample datasets for demonstration
- PDF generation includes proper page breaks and footer
- The layout is optimized for A4 paper size
- All form fields are read-only as data comes from the backend

## Data Structure
Each application uses a JSON-based data structure to populate dynamic content. The data files contain:
- Form metadata
- Dynamic table data
- User information
- Date information

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Documentation
Each application includes:
- Code comments
- Data structure documentation
- Usage examples
- Video demonstration 