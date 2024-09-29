// client/src/redux/actions/productActions.js
import axios from 'axios';
// Fetch all products
export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCTS_REQUEST' });
    const { data } = await axios.get('http://localhost:5000/api/products');
    dispatch({ type: 'PRODUCTS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'PRODUCTS_FAIL', payload: error.message });
  }
};

// Fetch product details
export const fetchProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_DETAILS_REQUEST' });
    const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
    dispatch({ type: 'PRODUCT_DETAILS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'PRODUCT_DETAILS_FAIL', payload: error.message });
  }
};
