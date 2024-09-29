// src/redux/reducers/cartReducer.js
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../constants/cartConstants';

// Load initial cart from local storage
const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem('cart');
  return cartData ? JSON.parse(cartData) : [];
};

const initialState = {
  cart: loadCartFromLocalStorage(),
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItemIndex = state.cart.findIndex(item => item.productId === action.payload.productId);
      let updatedCart;

      if (existingItemIndex !== -1) {
        // Update the quantity of the existing item
        updatedCart = [...state.cart];
        updatedCart[existingItemIndex] = action.payload;
      } else {
        // Add new item
        updatedCart = [...state.cart, action.payload];
      }

      saveCartToLocalStorage(updatedCart);
      return {
        ...state,
        cart: updatedCart,
      };
    case REMOVE_FROM_CART:
      const updatedCartRemove = state.cart.filter(item => item._id !== action.payload);
      saveCartToLocalStorage(updatedCartRemove);
      return {
        ...state,
        cart: updatedCartRemove,
      };
    case CLEAR_CART:
      saveCartToLocalStorage([]);
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
