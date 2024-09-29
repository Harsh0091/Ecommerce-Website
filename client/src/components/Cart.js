// src/components/Cart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../redux/actions/orderActions';
import { removeFromCart, clearCart } from '../redux/actions/cartActions';
import './Cart.css';  // Import the CSS file
import { toast } from 'react-toastify';

const Cart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const handleCheckout = () => {
    const orderData = {
      user: user.id,
      products: cart.map((item) => ({ name: item.name, imageUrl: item.imageUrl, quantity: item.quantity })),
      totalPrice: cart.reduce((total, item) => total + item.price * item.quantity, 0),
    };
    dispatch(createOrder(orderData));
    toast.success('Checkout successfully!');
    dispatch(clearCart(user.id));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success('Removed from cart successfully!');
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <img src="/path/to/empty-cart-image.png" alt="Empty Cart" className="empty-cart-image" />
          <h2>Your cart is empty</h2>
          <p>It looks like you haven't added any items to your cart yet. Explore our products and add your favorite items to the cart!</p>
          <button className="shop-now-button" onClick={() => window.location.href = '/products'}>Shop Now</button>
        </div>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={`${item._id}-${item.quantity}`} className="cart-item">
              <div className="cart-item-image">
                <img src={item.imageUrl} alt={item.name} />
              </div>
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
                <button onClick={() => handleRemoveFromCart(item._id)}>Remove from Cart</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <div className="buttons-container">
              <button onClick={handleCheckout} className="checkout-button">Checkout</button>
              <button onClick={() => dispatch(clearCart(user.id))} className="clear-cart-button">Clear Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
