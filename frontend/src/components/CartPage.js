import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cart, setCart }) => {
  const navigate = useNavigate();

  // Funkcija za navigaciju nazad na prodavnicu
  const goBackToStore = () => {
    navigate('/store'); // Prilagoditi ovu rutu prema tačnoj ruti vaše stranice prodavnice
  };

  // Funkcija za promjenu količine (povećanje ili smanjenje)
  const handleQuantityChange = (itemId, action) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === itemId) {
          let newQuantity = item.quantity;
          if (action === 'increase') {
            newQuantity += 1;
          } else if (action === 'decrease' && item.quantity > 1) {
            newQuantity -= 1;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  // Funkcija za uklanjanje stavke iz korpe
  const handleRemoveItem = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  return (
    <div className="cart-page">
      {/* Lebdeći dugme "Back to Store" */}
      <button onClick={goBackToStore} className="back-to-store-btn-floating">
        ↩ Back to Store
      </button>

      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty. Time to fill it up!</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img 
                  src={item.image_url || "https://via.placeholder.com/100"} 
                  alt={item.name} 
                />
              </div>
              <div className="cart-item-info">
                <h2 className="cart-item-name">{item.name}</h2>
                <p className="cart-item-price">Price: <strong>${item.price}</strong></p>

                {/* Kontrole količine */}
                <div className="cart-item-quantity">
                  <button 
                    className="quantity-btn" 
                    onClick={() => handleQuantityChange(item.id, 'decrease')}
                  >
                    -
                  </button>
                  <span>Quantity: {item.quantity}</span>
                  <button 
                    className="quantity-btn" 
                    onClick={() => handleQuantityChange(item.id, 'increase')}
                  >
                    +
                  </button>
                </div>

                <p className="cart-item-total">
                  Total: <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </p>

                {/* Dugme za uklanjanje stavke */}
                <button 
                  className="remove-item-btn" 
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="cart-footer">
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
