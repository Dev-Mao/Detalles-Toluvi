import { useState  } from 'react';

function ProductCard({ product }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    // Funciones para manejar el cambio de imágenes
    const showPreviousImage = () => {
      setCurrentImageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };
  
    const showNextImage = () => {
      setCurrentImageIndex((prevIndex) => Math.min(prevIndex + 1, product.images.length - 1));
    };
  
    return (
      <div className="product-card">
        <h2 className="product-name">{product.name}</h2>
        {product.images.map((image, index) => (
          <img
            className="product-img"
            src={image}
            key={index}
            alt={`Product ${index + 1}`}
            style={{ display: index === currentImageIndex ? 'block' : 'none' }}
          />
        ))}
        <span className="product-price">{product.price}</span>
  
        {/* Flechas para cambiar de imagen */}
        <div>
          <button onClick={showPreviousImage} disabled={currentImageIndex === 0}>
            Anterior
          </button>
          <button onClick={showNextImage} disabled={currentImageIndex === product.images.length - 1}>
            Siguiente
          </button>
        </div>
      </div>
    );
  }
  
  export default ProductCard;