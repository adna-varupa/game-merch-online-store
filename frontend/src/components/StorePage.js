import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StorePage.css'; 
import { useNavigate } from 'react-router-dom'; // Use useNavigate from react-router-dom

const StorePage = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    axios.get('http://localhost:3001/api/products/get')  
      .then(response => {
        setProducts(response.data);  
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  // Function to handle adding products to the cart
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to navigate to the cart page
  const viewCart = () => {
    navigate('/cart'); // Navigate to cart page using useNavigate
  };

  return (
    <div>
      <h1>Your Adventure Begins Here</h1>
      <button onClick={viewCart} className="view-cart-button">View Cart ({cart.length})</button>
      
      <div className="product-list">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image_url} alt={product.name} width="200" />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StorePage;