import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name', res.data.name);
      navigate('/');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Welcome Back!</h2>
        <p style={subtitleStyle}>Login to your ShopZen account</p>

        {message && <p style={messageStyle}>{message}</p>}

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label style={labelStyle}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" style={btnStyle}>Login</button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
          Don't have an account? <Link to="/register" style={{ color: '#ff6b35' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80vh'
};

const cardStyle = {
  background: '#fff',
  padding: '40px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '420px'
};

const titleStyle = {
  fontSize: '26px',
  fontWeight: 'bold',
  marginBottom: '5px',
  color: '#1a1a2e'
};

const subtitleStyle = {
  color: '#888',
  marginBottom: '25px',
  fontSize: '14px'
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontSize: '13px',
  fontWeight: '600',
  color: '#555'
};

const btnStyle = {
  width: '100%',
  backgroundColor: '#ff6b35',
  color: '#fff',
  padding: '12px',
  fontSize: '16px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  marginTop: '5px'
};

const messageStyle = {
  backgroundColor: '#fff3e0',
  color: '#e65100',
  padding: '10px',
  borderRadius: '6px',
  marginBottom: '15px',
  fontSize: '14px',
  textAlign: 'center'
};

export default Login;
