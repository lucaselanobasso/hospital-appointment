// Servidor estático para servir o frontend
const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();

app.use(express.static(path.join(__dirname, '../../public')));

const FRONTEND_PORT = process.env.FRONTEND_PORT || 5000;
app.listen(FRONTEND_PORT, () => {
  console.log(`Frontend rodando em http://localhost:${FRONTEND_PORT}`);
});
