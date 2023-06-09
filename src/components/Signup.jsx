import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Obtain the token from your authentication mechanism and store it in the "token" variable
    const token = process.env.REACT_APP_JWT_SECRET_KEY;

    // Make HTTP request to register the user
    axios
      .post('https://cryptic-woodland-28293.herokuapp.com/api/signup', { username, password, email }, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the headers
        }
      })
      .then(response => {
        // Handle successful registration
        if (response.status === 201) {
          // Registration successful, redirect to the login page
          navigate('/login');
        } else {
          // Handle other response statuses if needed
        }
      })
      .catch(error => {
        // Handle registration error
        console.error('Registration error:', error);
      });
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
