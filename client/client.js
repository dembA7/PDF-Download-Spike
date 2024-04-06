const express = require('express');
const app = express();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/get-data-and-pdf', (req, res) => {
  axios.get('http://localhost:3000/get-data')
    .then(response => {
      const data = response.data;
      generatePDF(data);
      const pdfPath = path.join(__dirname, 'file.pdf');
      res.sendFile(pdfPath);
    })
    .catch(error => {
      console.error('Error al obtener datos del servidor principal:', error);
      res.status(500).json({ error: 'Error al obtener datos del servidor principal' });
    });
});


function generatePDF(data) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(path.join(__dirname, 'file.pdf')));
  doc.text(`Datos recibidos del servidor: ${JSON.stringify(data)}`);
  doc.end();
}

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Client listening at port: ${PORT}.`);
});
