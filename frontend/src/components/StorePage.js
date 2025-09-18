import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import './StorePage.css'; 
import { useNavigate } from 'react-router-dom'; 

const StorePage = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get('http://localhost:3001/api/products/get')  
      .then(response => {
        setProducts(response.data);  
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  // Funkcija za dodavanje proizvoda u korpu
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

  // Funkcija za navigaciju do stranice sa korpom
  const viewCart = () => {
    navigate('/cart'); 
  };

  return (
    <div className="store-container">
      <h1 className="adventure-header">Your adventure begins here! <span className="heart">⚔️</span></h1>

      <button onClick={viewCart} className="view-cart-button">View Cart ({cart.length})</button>
      
      <div className="product-list">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image_url} alt={product.name} width="200" />
              <h2>{product.name}</h2>
              <p className="category">{product.category}</p>
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
