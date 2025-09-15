# Una Galería de Imágenes con Subida de Archivos (Enfoque SPA + API)

## Descripción: 
Una aplicación donde los usuarios pueden subir imágenes, ponerles un título y una descripción, y ver una galería de todas las imágenes subidas.

## Tecnologías:
Backend API (en ECS): Node.js/Express para manejar la lógica. Usaría la librería multer-s3 para recibir las subidas de archivos y enviarlas directamente al bucket de S3. Guardaría la URL de la imagen y los metadatos (título, descripción) en la base de datos PostgreSQL.
Frontend (en S3): Una SPA en React/Vue que muestra un formulario de subida y renderiza la galería llamando a la API del backend.
