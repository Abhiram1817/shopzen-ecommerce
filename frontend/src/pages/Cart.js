import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/cart', {
        headers: { authorization: token }
      });
      setCart(res.data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/cart/remove/${id}`, {
        headers: { authorization: token }
      });
      fetchCart();
    } catch {
      setMessage('Failed to remove item');
    }
  };

  const placeOrder = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/orders/place',
        {},
        { headers: { authorization: token } }
      );
      setMessage(`Order placed! Order ID: #${res.data.order_id} | Total: ₹${Number(res.data.total_amount).toLocaleString('en-IN')}`);
      setCart([]);
    } catch {
      setMessage('Failed to place order');
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading cart...</p>;

  return (
    <div style={{ padding: '20px 0' }}>
      <h2 style={titleStyle}>🛒 My Cart</h2>

      {message && <p style={messageStyle}>{message}</p>}

      {cart.length === 0 ? (
        <div style={emptyStyle}>
          <p style={{ fontSize: '18px', color: '#888' }}>Your cart is empty!</p>
          <button style={btnStyle} onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      ) : (
        <div style={containerStyle}>
          {/* Cart Items */}
          <div style={itemsStyle}>
            {cart.map(item => (
              <div key={item.id} style={cardStyle}>
                <img
                  src={item.image_url}
                  alt={item.name}
                  style={imgStyle}
                  onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', marginBottom: '5px' }}>{item.name}</h3>
                  <p style={{ color: '#ff6b35', fontWeight: 'bold', fontSize: '18px' }}>
                    ₹{Number(item.price).toLocaleString('en-IN')}
                  </p>
                  <p style={{ color: '#888', fontSize: '14px' }}>Quantity: {item.quantity}</p>
                  <p style={{ color: '#555', fontSize: '14px', fontWeight: 'bold' }}>
                    Subtotal: ₹{Number(item.price * item.quantity).toLocaleString('en-IN')}
                  </p>
                </div>
                <button
                  style={removeBtn}
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={summaryStyle}>
            <h3 style={{ marginBottom: '20px', color: '#1a1a2e' }}>Order Summary</h3>
            <div style={rowStyle}>
              <span>Items ({cart.length})</span>
              <span>₹{Number(total).toLocaleString('en-IN')}</span>
            </div>
            <div style={rowStyle}>
              <span>Delivery</span>
              <span style={{ color: 'green' }}>FREE</span>
            </div>
            <hr style={{ margin: '15px 0' }} />
            <div style={{ ...rowStyle, fontSize: '18px', fontWeight: 'bold' }}>
              <span>Total</span>
              <span style={{ color: '#ff6b35' }}>₹{Number(total).toLocaleString('en-IN')}</span>
            </div>
            <button style={orderBtn} onClick={placeOrder}>
              Place Order →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const titleStyle = {
  fontSize: '26px',
  fontWeight: 'bold',
  color: '#1a1a2e',
  marginBottom: '25px'
};

const messageStyle = {
  backgroundColor: '#e8f5e9',
  color: '#2e7d32',
  padding: '12px',
  borderRadius: '6px',
  marginBottom: '20px',
  fontSize: '14px'
};

const emptyStyle = {
  textAlign: 'center',
  padding: '60px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px'
};

const containerStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 320px',
  gap: '25px',
  alignItems: 'start'
};

const itemsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px'
};

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '20px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
  display: 'flex',
  gap: '20px',
  alignItems: 'center'
};

const imgStyle = {
  width: '100px',
  height: '100px',
  objectFit: 'contain',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  padding: '5px'
};

const removeBtn = {
  backgroundColor: '#fff',
  color: '#e53935',
  border: '1px solid #e53935',
  padding: '8px 14px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '13px'
};

const summaryStyle = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '25px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
  position: 'sticky',
  top: '20px'
};

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '12px',
  fontSize: '15px',
  color: '#555'
};

const orderBtn = {
  width: '100%',
  backgroundColor: '#ff6b35',
  color: '#fff',
  padding: '14px',
  fontSize: '16px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  marginTop: '20px'
};

const btnStyle = {
  backgroundColor: '#ff6b35',
  color: '#fff',
  padding: '12px 25px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '15px'
};

export default Cart;
