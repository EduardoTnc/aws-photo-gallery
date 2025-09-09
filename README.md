# Una Galería de Imágenes con Subida de Archivos (Enfoque SPA + API)

## Descripción: 
Una aplicación donde los usuarios pueden subir imágenes, ponerles un título y una descripción, y ver una galería de todas las imágenes subidas.

## Tecnologías:
Backend API (en ECS): Node.js/Express para manejar la lógica. Usaría la librería multer-s3 para recibir las subidas de archivos y enviarlas directamente al bucket de S3. Guardaría la URL de la imagen y los metadatos (título, descripción) en la base de datos PostgreSQL.
Frontend (en S3): Una SPA en React/Vue que muestra un formulario de subida y renderiza la galería llamando a la API del backend.

## Complejidad: 
Media-Alta. Este es el proyecto más completo y el que mejor demuestra el dominio de múltiples servicios de AWS interactuando.

## Por qué es buena idea: 
- Utiliza TODOS los componentes de tu arquitectura de manera significativa:
    - ECS/RDS: Para la API y los metadatos.
    - S3: No solo como un concepto, sino para el almacenamiento real de los archivos de la aplicación.
    - ALB: Para enrutar el tráfico a la API.
- Demuestra una arquitectura desacoplada y moderna (SPA + API).