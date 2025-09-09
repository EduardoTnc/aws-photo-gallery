// src/components/EditImageModal.jsx
import { useState, useEffect } from 'react';

const EditImageModal = ({ image, apiUrl, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (image) {
      setTitle(image.title);
      setDescription(image.description);
    }
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setError('El título es obligatorio.');
      return;
    }
    setSaving(true);
    setError('');

    try {
      const response = await fetch(`${apiUrl}/api/images/${image.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la imagen.');
      }

      const updatedImage = await response.json();
      onSave(updatedImage);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Editar Imagen</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="edit-title" className="block text-gray-700 font-bold mb-2">Título</label>
            <input type="text" id="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="edit-description" className="block text-gray-700 font-bold mb-2">Descripción</label>
            <textarea id="edit-description" value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancelar</button>
            <button type="submit" disabled={saving} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-300">
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2 text-right">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditImageModal;
