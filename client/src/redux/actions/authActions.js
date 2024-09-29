import axios from 'axios';
import { toast } from 'react-toastify';

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGOUT = 'LOGOUT';

// Login Action
export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: LOGIN_SUCCESS, payload: user });
    toast.success('Logged in successfully!');
    return Promise.resolve();
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
    dispatch({ type: LOGIN_FAIL, payload: errorMessage });
    toast.error(errorMessage);
    return Promise.reject(error);
  }
};

// Register Action
export const register = (userData) => async (dispatch) => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      dispatch({ type: REGISTER_SUCCESS });
      toast.success('Registration successful! Please login.');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      dispatch({ type: REGISTER_FAIL, payload: errorMessage });
      toast.error(errorMessage);
    }
  };

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT, });
  };
  