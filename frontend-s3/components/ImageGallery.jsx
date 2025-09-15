// src/components/ImageGallery.jsx
import ImageCard from './ImageCard';
import EmptyState from './EmptyState';

const ImageGallery = ({ images, onEdit, onDelete }) => {
    if (!images || images.length === 0) {
        return <EmptyState title="Sin imágenes" subtitle="Sube una imagen para empezar a ver tu galería." />
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map(image => (
                <ImageCard key={image.id} image={image} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
};
export default ImageGallery;