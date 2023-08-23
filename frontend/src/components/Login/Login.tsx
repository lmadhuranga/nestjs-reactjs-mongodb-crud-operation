import React, { useState } from 'react';
import './Login.css'; // Import your custom CSS file
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 
  const handleLogin = async () => {
    setError('');

    try {
      // Todo:: need to add url to env file
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const {access_token} = await response.json();
        // token store in local storage
        localStorage.setItem('token', access_token);
        console.log(`Login success full`);
        // Redirect to home page
        navigate('/services');
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login Page</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
