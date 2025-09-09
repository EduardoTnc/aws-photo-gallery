// controllers/imageController.js
const db = require('../config/db');

// Obtener todas las imágenes
exports.getAllImages = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM images ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

// Obtener una sola imagen
exports.getImageById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query('SELECT * FROM images WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).send('Imagen no encontrada');
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

// Subir una nueva imagen
exports.uploadImage = async (req, res) => {
  const { title, description } = req.body;
  const imageUrl = req.file.location;

  if (!title || !imageUrl) {
    return res.status(400).send('Título e imagen son requeridos.');
  }

  try {
    const { rows } = await db.query(
      'INSERT INTO images (title, description, image_url) VALUES ($1, $2, $3) RETURNING *',
      [title, description, imageUrl]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error al guardar en la base de datos');
  }
};

// Actualizar una imagen
exports.updateImage = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).send('El título es requerido.');
  }

  try {
    const { rows } = await db.query(
      'UPDATE images SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, id]
    );
    if (rows.length === 0) {
      return res.status(404).send('Imagen no encontrada');
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error al actualizar en la base de datos');
  }
};

// Eliminar una imagen
exports.deleteImage = async (req, res) => {
  const { id } = req.params;

  try {
    const { rowCount } = await db.query('DELETE FROM images WHERE id = $1',
      [id]
    );
    if (rowCount === 0) {
      return res.status(404).send('Imagen no encontrada');
    }
    res.status(204).send(); // No content
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error al eliminar de la base de datos');
  }
};