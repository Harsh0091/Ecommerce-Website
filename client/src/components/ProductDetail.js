import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/cartActions';
import { toast } from 'react-toastify';
import './ProductDetails.css'; // Import the CSS file for specific styling

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products || {});
  const { isAuthenticated, user } = useSelector((state) => state.auth || {});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('You need to be logged in to add items to the cart.');
      return;
    }
    // Ensure quantity is a number and within stock limit
    const qty = Math.max(1, Math.min(parseInt(quantity), product.stock));

    dispatch(addToCart({
      userId: user.id, // Assuming user is logged in and has an _id
      _id: product._id,
      quantity: qty, // Use the updated quantity
      price: product.price,
      imageUrl: product.imageUrl,
      name: product.name
    }));
    toast.success('Added to cart successfully!');
  };

  const handleBuyNow = () => {
    // Buy now functionality
    // dispatch(buyNow(id, quantity)); // Assuming you have this action
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    // Ensure quantity is a valid number and within stock limit
    if (!isNaN(value) && value >= 1 && value <= product.stock) {
      setQuantity(value);
    } else if (value < 1) {
      setQuantity(1);
    } else {
      setQuantity(product.stock);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product-details">
      <div className="product-image">
        {product.imageUrl && (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
          />
        )}
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="product-price">${product.price}</p>
        <div className="product-quantity">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            max={product.stock}
          />
          <span className="stock-info">Stock Available: {product.stock}</span>
        </div>
        <div className="product-buttons">
          <button onClick={handleAddToCart}>Add to Cart</button>
          <button onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
      <div className="product-description">
        <h2>Description</h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
