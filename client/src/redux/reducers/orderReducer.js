// client/src/redux/reducers/orderReducer.js

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ORDERS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_ORDERS_SUCCESS':
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case 'FETCH_ORDERS_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'CREATE_ORDER':
      return {
        ...state,
        // Optionally handle created orders if needed
      };
    case 'CREATE_ORDER_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
