import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StorePage.css'; 


const StorePage = () => {
  // State to store products
  const [products, setProducts] = useState([]);

  // Fetch products from backend when component mounts
  useEffect(() => {
    // Fetching products from the backend API
    axios.get('http://localhost:3001/api/products/get')  // Ensure the URL is correct
      .then(response => {
        setProducts(response.data);  // Store the products in the state
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);  // Empty array means it runs once when the component is mounted

  return (
    <div>
      <h1>Welcome to the Store</h1>
      <div className="product-list">
        {/* Loop through the products and display each one */}
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image_url} alt={product.name} width="200" />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <button>Add to Cart</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StorePage;
