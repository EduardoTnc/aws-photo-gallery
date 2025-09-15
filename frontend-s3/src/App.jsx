// src/App.jsx
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ImageGallery from '../components/ImageGallery';
import ImageUploadForm from '../components/ImageUploadform';
import EditImageModal from '../components/EditImageModal';
import Toast from '../components/Toast';

const API_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [images, setImages] = useState([]);
  const [editingImage, setEditingImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ open: false, message: '', type: 'info' });

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/images`);
      if (!response.ok) {
        throw new Error('No se pudieron cargar las imágenes.');
      }
      const data = await response.json();
      setImages(data);
    } catch (err) {
      setError(err.message);
      setToast({ open: true, message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUploadSuccess = (newImage) => {
    setImages([newImage, ...images]);
    setToast({ open: true, message: 'Imagen subida correctamente', type: 'success' });
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
        setToast({ open: true, message: 'Imagen eliminada', type: 'success' });
      } catch (err) {
        setError(err.message);
        setToast({ open: true, message: err.message, type: 'error' });
      }
    }
  };

  const handleSave = (updatedImage) => {
    setImages(images.map(img => (img.id === updatedImage.id ? updatedImage : img)));
    setEditingImage(null);
    setToast({ open: true, message: 'Cambios guardados', type: 'success' });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <ImageUploadForm apiUrl={API_URL} onUploadSuccess={handleUploadSuccess} />
        {error && <p className="text-red-500 text-center my-4">{error}</p>}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="aspect-video bg-slate-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ImageGallery images={images} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </main>
      {editingImage && (
        <EditImageModal
          image={editingImage}
          apiUrl={API_URL}
          onSave={handleSave}
          onCancel={() => setEditingImage(null)}
        />
      )}
      <Toast open={toast.open} message={toast.message} type={toast.type} onClose={() => setToast(t => ({ ...t, open: false }))} />
    </div>
  );
}

export default App;
