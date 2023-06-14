import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';



function Register() {
    
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const createdUser = {
      username: username,
      email: email,
      password: password

    }
    // console.log(createdUser)

    try {
      const response = await axios.post('http://localhost:9000/register', {
        username,
        email,
        password
      });
      const token = response.data.token
      // console.log("token", token)
      const data = jwt.decode(token)
      // console.log('data', data)
      

      // Display success message
      Cookies.set('currentUser', token);

      setMessage('Registered successfully');
    } catch (error) {
      console.log(error)
      console.log(error)
      // Handle registration errors
      setMessage(`Registration failed due to this error: ${error.response.data.message}`);
    }
  };

  return (
    <div>
      <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title text-center">Register</h1>
            <form onSubmit={handleRegister} id="register-form">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" required />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required/>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"  required/>
              </div>
              <small id="emailHelp" className="form-text text-muted">Have an Account <Link to='/login' >Sign in</Link> </small>
              <div class="mt-3">
                <button type="submit" class="btn btn-primary">Register</button>
              </div>
              <div id="response-message" class="mt-3 text-center">{message}</div>


            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

    </div>
    // <div>
    //   <h2>Register</h2>
    //   <form onSubmit={handleRegister}>
    //     <input
    //       type="text"
    //       placeholder="Username"
          // value={username}
          // onChange={(e) => setUsername(e.target.value)}
    //     />
    //     <input
    //       type="email"
    //       placeholder="Email"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <button type="submit">Register</button>
    //   </form>
    //   {message && <p>{message}</p>}
    // </div>
  );
}

export default Register;
