import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import StorePage from './components/StorePage';
import CartPage from './components/CartPage'; // Import CartPage

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [cart, setCart] = useState([]); // Cart state to hold products in cart

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm setIsLogin={setIsLogin} />} />
        <Route path="/login" element={<LoginForm setIsLogin={setIsLogin} />} />
        <Route path="/store" element={<StorePage cart={cart} setCart={setCart} />} />  {/* Pass cart and setCart to StorePage */}
        <Route path="/cart" element={<CartPage cart={cart} />} />  {/* Cart page route */}
        <Route path="/register" element={<RegistrationForm />} />  {/* Add registration route */}
      </Routes>
    </Router>
  );
};

export default App;
