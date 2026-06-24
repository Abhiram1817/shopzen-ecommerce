import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const navStyle = {
  backgroundColor: '#1a1a2e',
  padding: '15px 40px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '30px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
};

const logoStyle = {
  color: '#ff6b35',
  fontSize: '24px',
  fontWeight: 'bold',
  textDecoration: 'none'
};

const navLinksStyle = {
  display: 'flex',
  gap: '20px',
  alignItems: 'center'
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '15px'
};

const btnStyle = {
  backgroundColor: '#ff6b35',
  color: '#fff',
  padding: '8px 18px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '14px'
};

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/login');
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>🧘 ShopZen</Link>
      <div style={navLinksStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        {token ? (
          <>
            <Link to="/cart" style={linkStyle}>Cart</Link>
            <Link to="/orders" style={linkStyle}>Orders</Link>
            <span style={{ color: '#ff6b35', fontSize: '14px' }}>Hi, {name}!</span>
            <button style={btnStyle} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>
              <button style={btnStyle}>Register</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
