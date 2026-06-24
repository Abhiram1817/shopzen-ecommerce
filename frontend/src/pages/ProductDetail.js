import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => setMessage('Product not found'));
  }, [id]);

  const addToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      await axios.post(
        'http://localhost:8000/api/cart/add',
        { product_id: product.id, quantity: 1 },
        { headers: { authorization: token } }
      );
      setMessage('Added to cart successfully!');
    } catch {
      setMessage('Failed to add to cart');
    }
  };

  if (!product) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;

  return (
    <div style={containerStyle}>
      <button onClick={() => navigate(-1)} style={backBtn}>← Back</button>
      <div style={cardStyle}>
        <img
          src={product.image_url}
          alt={product.name}
          style={imgStyle}
          onError={(e) => e.target.src = 'https://via.placeholder.com/300'}
        />
        <div style={infoStyle}>
          <p style={badgeStyle}>{product.category}</p>
          <h1 style={titleStyle}>{product.name}</h1>
          <p style={descStyle}>{product.description}</p>
          <p style={priceStyle}>₹{Number(product.price).toLocaleString('en-IN')}</p>
          <p style={stockStyle}>{product.stock > 0 ? `✅ ${product.stock} in stock` : '❌ Out of stock'}</p>

          {message && <p style={messageStyle}>{message}</p>}

          <button
            style={product.stock > 0 ? btnStyle : disabledBtn}
            onClick={addToCart}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}

const containerStyle = { padding: '20px 0' };

const backBtn = {
  backgroundColor: 'transparent',
  border: '1px solid #ddd',
  padding: '8px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
  marginBottom: '20px',
  fontSize: '14px'
};

const cardStyle = {
  display: 'flex',
  gap: '40px',
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '30px',
  boxShadow: '0 2px 15px rgba(0,0,0,0.08)'
};

const imgStyle = {
  width: '350px',
  height: '350px',
  objectFit: 'contain',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  padding: '20px'
};

const infoStyle = { flex: 1 };

const badgeStyle = {
  fontSize: '12px',
  color: '#ff6b35',
  fontWeight: '600',
  textTransform: 'uppercase',
  marginBottom: '8px'
};

const titleStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#1a1a2e',
  marginBottom: '15px'
};

const descStyle = {
  fontSize: '15px',
  color: '#666',
  lineHeight: '1.6',
  marginBottom: '20px'
};

const priceStyle = {
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#ff6b35',
  marginBottom: '10px'
};

const stockStyle = {
  fontSize: '14px',
  color: '#555',
  marginBottom: '20px'
};

const messageStyle = {
  backgroundColor: '#fff3e0',
  color: '#e65100',
  padding: '10px',
  borderRadius: '6px',
  marginBottom: '15px',
  fontSize: '14px'
};

const btnStyle = {
  backgroundColor: '#ff6b35',
  color: '#fff',
  padding: '14px 30px',
  fontSize: '16px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  width: '100%'
};

const disabledBtn = {
  ...btnStyle,
  backgroundColor: '#ccc',
  cursor: 'not-allowed'
};

export default ProductDetail;
