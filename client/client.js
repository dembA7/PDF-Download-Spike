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

app.get('/get-data-and-pdf', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/get-data');
    const data = response.data;
    const pdfPath = await generatePDF(data);
    res.sendFile(pdfPath);
  } catch (error) {
    console.error('Error al obtener datos del servidor principal:', error);
    res.status(500).json({ error: 'Error al obtener datos del servidor principal' });
  }
});


function generatePDF(data) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const pdfPath = path.join(__dirname, 'file.pdf');
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);
    doc.text(`Datos recibidos del servidor: ${JSON.stringify(data)}`);
    doc.end();
    writeStream.on('finish', () => {
      resolve(pdfPath);
    });
    writeStream.on('error', (error) => {
      reject(error);
    });
  });
}

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Client listening at port: ${PORT}.`);
});
