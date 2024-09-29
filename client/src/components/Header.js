// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions'; // Adjust the import path if needed
import './Header.css';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">RED STORE</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Shop</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/order-history">Order History</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
              <Link to="/" onClick={handleLogout} className="login-button">Logout</Link>
              </li>
              <li>
              <Link to="/" className="username-button">{user.username}</Link>
            </li>
            </>
          ) : (
            <li>
              <Link to="/auth/login" className="login-button">Account</Link>
          </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
