const express = require('express');
const fs = require('fs');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  app.get('/download', (req, res) => {
 
    const filePath = 'file.pdf';

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).send('El archivo no existe');
      }
  
      res.download(filePath, 'file.pdf', (err) => {
        if (err) {
          console.error('Error al enviar el archivo:', err);
          res.status(500).send('Error interno del servidor al enviar el archivo');
        }
      });
    });
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}.`);
});
