import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/utility';


// const PrivateRoute = ({ element: Component, isAuthenticated, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       element={isAuthenticated ? <Component /> : <Navigate to="/login" replace />}
//     />
//   );
// };

const PrivateRoute = ({ children }) => {
  const authed = isAuthenticated() // isauth() returns true or false based on localStorage
  
  return authed ? children : <Navigate to="/login" />;
}


export default PrivateRoute;


