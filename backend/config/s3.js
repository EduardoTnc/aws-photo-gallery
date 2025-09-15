// config/s3.js
const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

// --- Lógica de configuración condicional ---
const s3Config = {
  region: process.env.AWS_REGION,
};

// Si estamos en desarrollo local (detectado por la presencia de la clave de acceso en .env),
// entonces añadimos las credenciales explícitamente.
if (process.env.AWS_ACCESS_KEY_ID) {
  s3Config.credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };
}

// En producción, el objeto 'credentials' no se añadirá,
// y el SDK buscará automáticamente el Rol de IAM.
const s3 = new S3Client(s3Config);

// Configuración de Multer para subir a S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    }
  })
});

module.exports = upload;