// src/redux/actions/cartActions.js
import axios from 'axios';
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../constants/cartConstants';
import { toast } from 'react-toastify';

export const addToCart = (product) => async (dispatch) => {
  try {
  
    const { data } = await axios.post('http://localhost:5000/api/cart/add', {
      userId: product.userId,
      productId: product._id,
      quantity: 1, // Default quantity
      price: product.price,
      imageUrl: product.imageUrl,
      name: product.name,
    });
    dispatch({
      type: ADD_TO_CART,
      payload: data,
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

export const removeFromCart = (_id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/cart/remove/${_id}`);
    dispatch({
      type: REMOVE_FROM_CART,
      payload: _id,
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
};

export const clearCart = (userId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/cart/clear/${userId}`);
    dispatch({
      type: CLEAR_CART,
    });
    toast.success('Cart cleared successfully!');
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
};
