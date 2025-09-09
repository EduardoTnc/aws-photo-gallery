// src/components/ImageGallery.jsx
import ImageCard from './ImageCard';

const ImageGallery = ({ images, onEdit, onDelete }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map(image => (
                <ImageCard key={image.id} image={image} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
};
export default ImageGallery;