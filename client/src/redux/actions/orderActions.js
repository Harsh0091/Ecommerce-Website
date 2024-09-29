// client/src/redux/actions/orderActions.js
import axios from 'axios';

// Action to create a new order
export const createOrder = (orderData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/orders', orderData);
    dispatch({ type: 'CREATE_ORDER', payload: response.data });
    return Promise.resolve(response.data);
  } catch (error) {
    console.error('Error creating order:', error);
    // Optionally dispatch an error action
    dispatch({ type: 'CREATE_ORDER_ERROR', payload: error.message });
    return Promise.reject(error);
  }
};

// Action to fetch orders for a user
export const fetchOrders = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/orders/${userId}`);
    dispatch({ type: 'FETCH_ORDERS_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error fetching orders:', error);
    // Optionally dispatch an error action
    dispatch({ type: 'FETCH_ORDERS_FAIL', payload: error.message });
  }
};
