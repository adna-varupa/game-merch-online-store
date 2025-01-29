import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import StorePage from './components/StorePage';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Router>
      <Routes>
        {/* Define the root path that redirects to the login page */}
        <Route path="/" element={<LoginForm setIsLogin={setIsLogin} />} />
        <Route path="/login" element={<LoginForm setIsLogin={setIsLogin} />} />
        <Route path="/store" element={<StorePage />} />
        {/* Add other routes as necessary */}
      </Routes>
    </Router>
  );
};

export default App;
