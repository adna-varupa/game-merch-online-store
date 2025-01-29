import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import './CartPage.css';

const CartPage = ({ cart }) => {
  const navigate = useNavigate();  // Initialize useNavigate

  // Function to navigate back to the store
  const goBackToStore = () => {
    navigate('/store');  // Adjust this to the correct route for your store page
  };

  return (
    <div className="cart-page">
      {/* Floating "Back to Store" Button */}
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
                  src={item.image_url || "https://via.placeholder.com/100"}  // Default image if no URL
                  alt={item.name}
                />
              </div>
              <div className="cart-item-info">
                <h2 className="cart-item-name">{item.name}</h2>
                <p className="cart-item-price">Price: <strong>${item.price}</strong></p>
                <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                <p className="cart-item-total">Total: <strong>${(item.price * item.quantity).toFixed(2)}</strong></p>
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
