// client/src/components/OrderHistory.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../redux/actions/orderActions';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './OrderHistory.css';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth || {});
  const { orders, loading, error } = useSelector((state) => state.orders || {});
  const [activeOrderId, setActiveOrderId] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      dispatch(fetchOrders(user.id));
    }
    toast.success('Your Orders!');
  }, [dispatch, isAuthenticated, user]);

  const handleOrderClick = (orderId) => {
    setActiveOrderId(orderId === activeOrderId ? null : orderId);
  };

  if (!isAuthenticated) return <p>Please log in to view your orders.</p>;
  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="order-history-container">
      <h1>Your Order History</h1>
      {orders.length === 0 ? (
        <div className="no-orders">
          <h2>No Orders Found</h2>
          <p>It looks like you haven't placed any orders yet.</p>
          <p>Start shopping now to add items to your order history!</p>
          <Link to="/products" className="view-details-button">Start Shopiing Now</Link>
        </div>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div
              key={order._id}
              className={`order-list-item ${order._id === activeOrderId ? 'active' : ''}`}
              onClick={() => handleOrderClick(order._id)}
            >
              <h2>Order ID: {order._id}</h2>
            </div>
          ))}
        </div>
      )}
      <div className={`order-details ${activeOrderId ? 'visible' : 'hidden'}`}>
        {orders
          .filter((order) => order._id === activeOrderId)
          .map((order) => (
            <div key={order._id}>
              <h2>Order ID: {order._id}</h2>
              <p>Status: {order.orderStatus}</p>
              <p>Total Price: ${order.totalPrice}</p>
              <div className="order-products">
                {order.products.map((product) => (
                  <div key={product._id} className="order-product-item">
                    <div className="product-image">
                      <img src={product.imageUrl} alt={product.name} />
                    </div>
                    <div className="product-details">
                      <p>Product name: {product.name}</p>
                      <p>Quantity: {product.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrderHistory;
