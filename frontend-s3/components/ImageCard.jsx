// src/components/ImageCard.jsx
const ImageCard = ({ image, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img src={image.image_url} alt={image.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{image.title}</h3>
        <p className="text-gray-600 mt-1">{image.description}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={() => onEdit(image)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-sm">Editar</button>
          <button onClick={() => onDelete(image.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;