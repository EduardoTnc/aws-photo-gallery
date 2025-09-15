import { useState, useMemo } from 'react';

const ImageUploadForm = ({ apiUrl, onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const previewUrl = useMemo(() => (imageFile ? URL.createObjectURL(imageFile) : null), [imageFile]);

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
      const response = await fetch(`${apiUrl}/api/images`, {
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
    <section id="upload" className="card p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Subir Nueva Imagen</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div>
            <label htmlFor="title" className="label">Título</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="input" placeholder="Ej. Atardecer en la playa" />
          </div>
          <div>
            <label htmlFor="description" className="label">Descripción</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="input min-h-24" placeholder="Añade una breve descripción" />
          </div>
          <div>
            <label htmlFor="image" className="label">Archivo de Imagen</label>
            <input type="file" id="image" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex gap-3">
            <button type="submit" disabled={uploading} className="btn btn-primary px-4 py-2">
              {uploading ? 'Subiendo...' : 'Subir Imagen'}
            </button>
            <button type="button" disabled={uploading} onClick={() => { setTitle(''); setDescription(''); setImageFile(null); setError(''); }} className="btn btn-secondary px-4 py-2">Limpiar</button>
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="border border-dashed border-slate-300 rounded-lg h-48 flex items-center justify-center overflow-hidden bg-slate-50">
            {previewUrl ? (
              <img src={previewUrl} alt="Vista previa" className="object-cover w-full h-full" />
            ) : (
              <span className="text-slate-400 text-sm">Vista previa</span>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

export default ImageUploadForm;