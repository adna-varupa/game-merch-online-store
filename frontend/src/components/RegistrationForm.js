import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './RegistrationForm.css'; 

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/api/auth/signup', {
        username,
        password
      });
      alert('Registration successful');
      navigate('/login');  // Navigate to the login page after successful registration
    } catch (err) {
      setError('Error registering user');
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
