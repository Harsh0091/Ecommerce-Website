// src/components/HomePage.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Ensure the path is correct
import { toast } from 'react-toastify';
import heroBackground from './image/5738925.jpg';

const HomePage = () => {
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
      userId: user.id, // Assuming user is logged in and has an _id
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
    <main className="homepage">
      <section className="hero" style={{ backgroundImage: `url(${heroBackground})` }}>
        <div className="hero-text">
          <h1>Welcome to Your Store</h1>
          <p>Explore our exclusive collection of products.</p>
          <Link to="/products" className="view-details-button">Shop Now</Link>
        </div>
      </section>
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.imageUrl} alt={product.name} className="product-img" />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <div className="product-actions">
                  <Link to={`/product/${product._id}/`} className="view-details-button">View Details</Link>
                  <button 
                    className="add-to-cart-button" 
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </section>
      <section className="promotional-banner">
        <h2>Special Offers</h2>
        <Link to="/products" className="view-details-button">Shop Now</Link>
      </section>
      <section className="newsletter">
        <h2>Subscribe to Our Newsletter</h2>
        <form>
          <input type="email" placeholder="Your Email Address" />
          <button type="submit" className="subscribe-button">Subscribe</button>
        </form>
      </section>
    </main>
  );
};

export default HomePage;
