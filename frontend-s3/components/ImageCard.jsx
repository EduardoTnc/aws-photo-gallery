// src/components/ImageCard.jsx
const ImageCard = ({ image, onEdit, onDelete }) => {
  return (
    <div className="card overflow-hidden group">
      <div className="relative aspect-video bg-slate-100">
        <img src={image.image_url} alt={image.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-slate-800 line-clamp-1">{image.title}</h3>
        {image.description && (
          <p className="text-slate-600 mt-1 text-sm line-clamp-2">{image.description}</p>
        )}
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={() => onEdit(image)} className="btn btn-secondary px-3 py-1.5">Editar</button>
          <button onClick={() => onDelete(image.id)} className="btn btn-danger px-3 py-1.5">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;