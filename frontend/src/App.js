import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
        {/* Login and Registration Routes */}
        <Route path="/" element={<LoginForm setIsLogin={setIsLogin} />} />
        <Route path="/login" element={<LoginForm setIsLogin={setIsLogin} />} />
        <Route path="/register" element={<RegistrationForm />} />  {/* Add registration route */}

        {/* Store and Cart Routes */}
        <Route 
          path="/store" 
          element={<StorePage cart={cart} setCart={setCart} />} />  {/* Pass cart and setCart to StorePage */}
        <Route 
          path="/cart" 
          element={<CartPage cart={cart} setCart={setCart} />} />  {/* Pass cart and setCart to CartPage */}

      </Routes>
    </Router>
  );
};

export default App;
