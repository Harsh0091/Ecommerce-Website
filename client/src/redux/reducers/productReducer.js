// client/src/redux/reducers/productReducer.js

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PRODUCTS_REQUEST':
      return { ...state, loading: true };
    case 'PRODUCTS_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'PRODUCTS_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PRODUCT_DETAILS_REQUEST':
      return { ...state, loading: true };
    case 'PRODUCT_DETAILS_SUCCESS':
      return { ...state, loading: false, product: action.payload };
    case 'PRODUCT_DETAILS_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
