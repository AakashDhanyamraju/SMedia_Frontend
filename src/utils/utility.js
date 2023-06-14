import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

import { Alert, Button, Modal, Toast } from 'react-bootstrap';

import 'react-toastify/dist/ReactToastify.css';


const useDecodedToken = () => {
  const token = Cookies.get('currentUser')
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    if (token) {
      const decoded = jwt.decode(token);
      setDecodedToken(decoded);
    }
  }, [token]);

  return decodedToken;
};

export default useDecodedToken

 
export const isAuthenticated = () => {
  const token = Cookies.get('currentUser')
  if(!token) return false
  else return true 

}

// export const showAlert = (variant, message) => {
//   const alert = (
//     <Alert variant={variant}>
//       {message}
//     </Alert>
//     // Toast[type](message)
    

//   )
//   return alert};

export const showAlert = (message) => {
  // const notify = () => 
    return (
      <div>
        {/* <button onClick={notify}></button> */}
        {toast({message})}
        <ToastContainer />
      </div>
    );
};
