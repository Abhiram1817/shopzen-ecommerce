import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ['All', 'Electronics', 'Footwear', 'Clothing'];

  const filtered = category === 'All'
    ? products
    : products.filter(p => p.category === category);

    const fallbackImages = {
      'iPhone 15': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      'Samsung Galaxy S24': 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
      'Nike Air Max': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      'Levi Jeans 511': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
      'Sony WH-1000XM5': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      'MacBook Air M2': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      'Adidas Ultraboost': 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400',
      'Boat Rockerz 450': 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400',
    };

  return (
    <div>
      {/* Hero */}
      <div style={heroStyle}>
        <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>Welcome to ShopZen 🧘</h1>
        <p style={{ fontSize: '16px', opacity: 0.9 }}>Find the best products at the best prices</p>
      </div>

      {/* Category Filter */}
      <div style={filterStyle}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={category === cat ? activeCatBtn : catBtn}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading products...</p>
      ) : (
        <div style={gridStyle}>
          {filtered.map(product => (
            <div key={product.id} style={cardStyle}>
              <img
                src={fallbackImages[product.name] || product.image_url}
                alt={product.name}
                style={imgStyle}
                onError={(e) => e.target.src = 'https://via.placeholder.com/200'}
              />
              <div style={{ padding: '15px' }}>
                <p style={categoryBadge}>{product.category}</p>
                <h3 style={productName}>{product.name}</h3>
                <p style={descStyle}>{product.description?.slice(0, 60)}...</p>
                <p style={priceStyle}>₹{Number(product.price).toLocaleString('en-IN')}</p>
                <p style={stockStyle}>Stock: {product.stock} left</p>
                <button
                  style={btnStyle}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const heroStyle = {
  background: 'linear-gradient(135deg, #1a1a2e, #ff6b35)',
  color: '#fff',
  padding: '50px 40px',
  borderRadius: '12px',
  marginBottom: '30px',
  textAlign: 'center'
};

const filterStyle = {
  display: 'flex',
  gap: '10px',
  marginBottom: '25px',
  flexWrap: 'wrap'
};

const catBtn = {
  padding: '8px 20px',
  backgroundColor: '#fff',
  border: '2px solid #ddd',
  borderRadius: '20px',
  cursor: 'pointer',
  fontSize: '14px',
  color: '#555'
};

const activeCatBtn = {
  ...catBtn,
  backgroundColor: '#ff6b35',
  color: '#fff',
  border: '2px solid #ff6b35'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '20px',
  paddingBottom: '40px'
};

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
  overflow: 'hidden',
  cursor: 'pointer'
};

const imgStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'contain',
  backgroundColor: '#f9f9f9',
  padding: '10px'
};

const categoryBadge = {
  fontSize: '11px',
  color: '#ff6b35',
  fontWeight: '600',
  textTransform: 'uppercase',
  marginBottom: '5px'
};

const productName = {
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '5px',
  color: '#1a1a2e'
};

const descStyle = {
  fontSize: '13px',
  color: '#888',
  marginBottom: '10px'
};

const priceStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#ff6b35',
  marginBottom: '4px'
};

const stockStyle = {
  fontSize: '12px',
  color: '#aaa',
  marginBottom: '12px'
};

const btnStyle = {
  width: '100%',
  backgroundColor: '#1a1a2e',
  color: '#fff',
  padding: '10px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '14px'
};

export default Home;
