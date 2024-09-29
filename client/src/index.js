// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store'; // Adjust the path based on your store file location
import App from './App';
import './styles.css'; // Import global styles if needed
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Create a root for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component wrapped in the Redux Provider
root.render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);