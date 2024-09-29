// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from './reducers/productReducer';
import authReducer from './reducers/authReducer';
import orderReducer from './reducers/orderReducer';
import cartReducer from './reducers/cartReducer';

const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    orders: orderReducer,
    cart: cartReducer,
  },
});

export default store;
