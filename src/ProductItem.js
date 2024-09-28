import React from 'react';

const ProductItem = ({ product, onAddToCart }) => {
  return (
    <div className="card h-100 shadow-sm">
      <img src={product.image} alt={product.name} className="card-img-top" />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-primary">{product.name}</h5>
        <p className="card-text text-muted">{product.description}</p>
        <p className="text-primary font-weight-bold">฿{product.price}</p>
        <button 
          className="btn btn-primary mt-auto"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
