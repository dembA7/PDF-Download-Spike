const express = require('express');
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

app.get('/get-data', (req, res) => {
  const data = Math.random();
  res.json({ data });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}.`);
});
