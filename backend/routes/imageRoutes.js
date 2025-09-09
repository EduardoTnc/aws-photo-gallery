// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const upload = require('../config/s3'); // Importamos el middleware de subida

router.get('/images', imageController.getAllImages);
router.get('/images/:id', imageController.getImageById);
router.post('/images', upload.single('image'), imageController.uploadImage);
router.put('/images/:id', imageController.updateImage);
router.delete('/images/:id', imageController.deleteImage);

module.exports = router;