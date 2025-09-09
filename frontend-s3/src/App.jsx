// src/App.jsx
import { useState, useEffect } from 'react';
import Header from '../../frontend-s3/components/Header';
import ImageGallery from '../../frontend-s3/components/ImageGallery';
import ImageUploadForm from '../../frontend-s3/components/ImageUploadform';
import EditImageModal from '../../frontend-s3/components/EditImageModal';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

function App() {
  const [images, setImages] = useState([]);
  const [editingImage, setEditingImage] = useState(null);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      const response = await fetch(`${API_URL}/api/images`);
      if (!response.ok) {
        throw new Error('No se pudieron cargar las imágenes.');
      }
      const data = await response.json();
      setImages(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUploadSuccess = (newImage) => {
    setImages([newImage, ...images]);
  };

  const handleEdit = (image) => {
    setEditingImage(image);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
      try {
        const response = await fetch(`${API_URL}/api/images/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Error al eliminar la imagen.');
        }
        setImages(images.filter(img => img.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleSave = (updatedImage) => {
    setImages(images.map(img => (img.id === updatedImage.id ? updatedImage : img)));
    setEditingImage(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="container mx-auto p-4">
        <ImageUploadForm apiUrl={API_URL} onUploadSuccess={handleUploadSuccess} />
        {error && <p className="text-red-500 text-center my-4">{error}</p>}
        <ImageGallery images={images} onEdit={handleEdit} onDelete={handleDelete} />
      </main>
      {editingImage && (
        <EditImageModal
          image={editingImage}
          apiUrl={API_URL}
          onSave={handleSave}
          onCancel={() => setEditingImage(null)}
        />
      )}
    </div>
  );
}

export default App;
