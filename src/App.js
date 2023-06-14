// import logo from './logo.svg';
// eslint-disable-next-line
import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Register from './pages/register';
import Login from './pages/login';
import NotFoundPage from './pages/404';
import Home from './pages/home';
import PrivateRoute from './components/PrivateRoute';
import { isAuthenticated } from './utils/utility';
import AppRoutes from './routes';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    
    // <BrowserRouter>
    
    //   <Routes>
    //     <Route exact path='/register' element = <Register/> />
    //     <Route exact path='/login' element = <Login/> />
    //     <PrivateRoute
    //       exact
    //       path="/"
    //       component={Home}
    //       isAuthenticated={isAuthenticated()}
    //     />
    //     <Route path="*" element = <NotFoundPage /> />

    //   </Routes>
      
    
    // </BrowserRouter>
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
      <ToastContainer />

    </BrowserRouter>
  );
}

export default App;
