import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart } from '../redux/actions/cartActions';
import './ProductList.css'; // Ensure this path is correct for your CSS file

const ProductList = () => {
  const dispatch = useDispatch();
  const { products = [], loading, error } = useSelector((state) => state.products || {});
  const { isAuthenticated, user } = useSelector((state) => state.auth || {});
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      toast.error('You need to be logged in to add items to the cart.');
      return;
    }
    dispatch(addToCart({
      userId: user.id,
      _id: product._id,
      price: product.price,
      imageUrl: product.imageUrl,
      name: product.name
    }));
    toast.success('Added to cart successfully!');
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error loading products: {error}</p>;
  }

  return (
    <div>
      <h1>All Products</h1>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-item">
              <h2>{product.name}</h2>
              {product.imageUrl && (
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="product-image"
                />
              )}
              <p>{product.description}</p>
              <p>${product.price}</p>
              <Link to={`/product/${product._id}`} className="view-details-button">View Details</Link>
              <button onClick={() => handleAddToCart(product)} className="add-to-cart-button">Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
