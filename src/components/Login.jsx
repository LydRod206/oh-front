import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Make HTTP request to authenticate the user
    axios
      .post('https://cryptic-woodland-28293.herokuapp.com/api/login', { username, password })
      .then(response => {
        // Handle successful login
        const token = response.data.token;
        // Save the token to local storage
        localStorage.setItem('token', token);

        // Redirect the user to the authenticated area or perform other actions
        navigate('/dashboard');
      })
      .catch(error => {
        // Handle login error
        console.error('Login error:', error);
      });
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;





// import React, { useState } from 'react';
// import axios from 'axios';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   function handleUsernameChange(event) {
//     setUsername(event.target.value);
//   }

//   function handlePasswordChange(event) {
//     setPassword(event.target.value);
//   }

//   function handleSubmit(event) {
//     event.preventDefault();

//     // Make HTTP request to authenticate the user
//     axios
//       .post('https://cryptic-woodland-28293.herokuapp.com/api/login', { username, password })
//       .then(response => {
//         // Handle successful login
//         const token = response.data.token;
//         // Save the token to local storage or state for future use

//         // Redirect the user to the authenticated area or perform other actions
//       })
//       .catch(error => {
//         // Handle login error
//         console.error('Login error:', error);
//       });
//   }

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username:</label>
//           <input type="text" value={username} onChange={handleUsernameChange} />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" value={password} onChange={handlePasswordChange} />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;
