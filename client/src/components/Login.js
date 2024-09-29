// src/components/LoginRegisterPage.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, register } from '../redux/actions/authActions'; // Adjust import paths as needed
import { useNavigate } from 'react-router-dom';
import './LoginRegisterPage.css';

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // For registration
  const [username, setUsername] = useState(''); // For registration
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(login({ email, password }))
        .then(() => {
          navigate('/'); // Redirect to home or desired page upon success
        })
        .catch((error) => {
          console.error("Error logging in:", error);
        });
    } else {
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      dispatch(register({ username, email, password }))
        .then(() => {
          navigate('/'); // Redirect to home or desired page upon success
        })
        .catch((error) => {
          console.error("Error registering:", error);
        });
    }
  };

  return (
    <div className="login-register-container">
      <div className="form-container">
        <h1>{isLogin ? 'Login' : 'Register'}</h1>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <button type="submit" className="submit-button">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button
          className="toggle-button"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
