import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    axios.get('http://localhost:8000/api/orders', {
      headers: { authorization: token }
    })
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading orders...</p>;

  return (
    <div style={{ padding: '20px 0' }}>
      <h2 style={titleStyle}>📦 My Orders</h2>

      {orders.length === 0 ? (
        <div style={emptyStyle}>
          <p style={{ fontSize: '18px', color: '#888' }}>No orders yet!</p>
          <button style={btnStyle} onClick={() => navigate('/')}>Start Shopping</button>
        </div>
      ) : (
        <div style={containerStyle}>
          {orders.map(order => (
            <div key={order.id} style={cardStyle}>
              <div style={headerStyle}>
                <div>
                  <h3 style={{ fontSize: '16px', color: '#1a1a2e' }}>
                    Order #{order.id}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>
                    {new Date(order.created_at).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={priceStyle}>
                    ₹{Number(order.total_amount).toLocaleString('en-IN')}
                  </p>
                  <span style={order.status === 'pending' ? pendingBadge : deliveredBadge}>
                    {order.status === 'pending' ? '🕐 Pending' : '✅ Delivered'}
                  </span>
                </div>
              </div>
            </div>
          ))}
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

const emptyStyle = {
  textAlign: 'center',
  padding: '60px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px'
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  paddingBottom: '40px'
};

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '20px 25px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.07)'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const priceStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#ff6b35',
  marginBottom: '6px'
};

const pendingBadge = {
  backgroundColor: '#fff3e0',
  color: '#e65100',
  padding: '4px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: '600'
};

const deliveredBadge = {
  backgroundColor: '#e8f5e9',
  color: '#2e7d32',
  padding: '4px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: '600'
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

export default Orders;
