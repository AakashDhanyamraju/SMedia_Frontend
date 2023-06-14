import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  // const isAuthenticated = isAuthenticated()
  // console.log(isAuthenticated)
//   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

//   const jwtToken = Cookies.get('currentUser');
//   const decodedToken = useDecodedToken(jwtToken);

//   console.log("decoded token",decodedToken)
  const handleLogin = async (e) => {
    e.preventDefault();

    const loggingUser = {
      username: username,
    //   email: email,
      password: password

    }
    // console.log(loggingUser)
    

    try {
      
      // Make a POST request to the register endpoint
      const response = await axios.post('http://localhost:9000/login', {
        username,
        password
      });
      // Display success message
      Cookies.set('currentUser', response.data.token);
      console.log(response)
      navigate('/');


      setMessage('Login successfull');
      toast.success('Login Successfull')
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.error)

      // Handle registration errors
      setMessage(`Login failed due to this error: ${error}`);
    }
  };

  return (

    // <div>
    //   <h2>Login</h2>
    //   <form onSubmit={handleLogin}>
    //     <input
    //       type="text"
    //       placeholder="Username"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //     />
        
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <button type="submit">Login</button>
    //   </form>
    //   {message && <p>{message}</p>}
    // </div>
    <div>
        <div className="container">
            <div className="row justify-content-center mt-5">
            <div className="col-md-6">
                <div className="card">
                <div className="card-body">
                    <h1 className="card-title text-center">Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" id="username" placeholder="Enter your username" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" placeholder="Enter your password" required/>
                        </div>
                        <small id="emailHelp" className="form-text text-muted">Dont have an Account ? <Link to='/register' >Sign up</Link> </small>

                        <div className="mt-3">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>

                        {/* <div id="response-message" class="mt-3 text-center">{message}</div> */}

                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>


  );
}

export default Login;
