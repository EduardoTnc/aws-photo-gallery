// config/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'webappdb',
  port: 5432,
});

// Script para crear la tabla si no existe
const createTable = async () => {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS images (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      image_url VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );`;
  try {
    await pool.query(createTableQuery);
    console.log("Tabla 'images' verificada/creada exitosamente.");
  } catch (err) {
    console.error("Error al crear la tabla:", err.message);
  }
};

module.exports = {
  query: (text, params) => pool.query(text, params),
  createTable,
};