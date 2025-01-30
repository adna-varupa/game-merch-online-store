import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import StorePage from './components/StorePage';
import CartPage from './components/CartPage'; // Uvezi CartPage

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [cart, setCart] = useState([]); // State za korpu koja čuva proizvode u korpi

  return (
    <Router>
      <Routes>
        {/* Rute za prijavu i registraciju */}
        <Route path="/" element={<LoginForm setIsLogin={setIsLogin} />} />
        <Route path="/login" element={<LoginForm setIsLogin={setIsLogin} />} />
        <Route path="/register" element={<RegistrationForm />} />  {/* Dodaj rutu za registraciju */}

        {/* Rute za prodavnicu i korpu */}
        <Route 
          path="/store" 
          element={<StorePage cart={cart} setCart={setCart} />} />  {/* Proslijedi cart i setCart u StorePage */}
        <Route 
          path="/cart" 
          element={<CartPage cart={cart} setCart={setCart} />} />  {/* Proslijedi cart i setCart u CartPage */}

      </Routes>
    </Router>
  );
};

export default App;
