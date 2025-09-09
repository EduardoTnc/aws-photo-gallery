import { useState } from 'react';

const ImageUploadForm = ({ apiUrl, onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile || !title) {
      setError('El título y la imagen son obligatorios.');
      return;
    }
    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', imageFile);

    try {
      const response = await fetch(`${apiUrl}/api/upload`, {
        method: 'POST',
        body: formData, // El navegador establece el Content-Type automáticamente
      });

      if (!response.ok) {
        throw new Error('Error al subir la imagen.');
      }

      const newImage = await response.json();
      onUploadSuccess(newImage); // Llama a la función del padre
      
      // Limpiar formulario
      setTitle('');
      setDescription('');
      setImageFile(null);
      e.target.reset();

    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-4">Subir Nueva Imagen</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Título</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Descripción</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Archivo de Imagen</label>
          <input type="file" id="image" onChange={(e) => setImageFile(e.target.files[0])} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
        </div>
        <button type="submit" disabled={uploading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-300">
          {uploading ? 'Subiendo...' : 'Subir Imagen'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};
export default ImageUploadForm;