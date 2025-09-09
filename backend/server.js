// server.js
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const imageRoutes = require('./routes/imageRoutes');
require('dotenv').config();

const app = express();
const port = 3000;

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Rutas ---
app.use('/api', imageRoutes); // Monta todas las rutas de imágenes bajo el prefijo /api

// Endpoint de Health Check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// --- Inicialización del Servidor ---
app.listen(port, () => {
  console.log(`Servidor API escuchando en el puerto ${port}`);
  db.createTable(); // Llama a la función para crear/verificar la tabla
});