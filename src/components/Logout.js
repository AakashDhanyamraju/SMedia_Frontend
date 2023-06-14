import Cookies from 'js-cookie';
import React from 'react';
// import { useCookies } from 'react-cookie';
import { Route, Navigate } from 'react-router-dom';

// import { useHistory } from 'react-router-dom';

const Logout = () => {
//   const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);
//   const history = useHistory();

  const handleLogout = () => {
    // Remove the 'currentUser' cookie
    return Cookies.remove('currentUser');
    // Redirect to the login page

  };

  return (
    <div>
      <h1>Logout Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;