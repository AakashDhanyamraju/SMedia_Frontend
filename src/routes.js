import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";
import NotFoundPage from "./pages/404";
import PrivateRoute from "./components/PrivateRoute";
import { isAuthenticated } from "./utils/utility";
import Logout from "./components/Logout";
import CreatePost from "./pages/CreatePost";
import ChatComponent from "./components/ChatComponent";
import Friends from "./pages/Friends";
// import FriendsPage from "./components/Friends";
import ChatRoom from "./components/ChattingRoom";
import Profile from "./pages/Profile";
import ChatSection from "./components/ChatUI";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/newpost"
        element={
          <PrivateRoute>
            <CreatePost />
          </PrivateRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <ChatComponent />
          </PrivateRoute>
        }
      />
      <Route
        path="/friends"
        element={
          <PrivateRoute>
            <Friends />
            {/* <FriendsPage /> */}
          </PrivateRoute>
        }
      />
      <Route
        path="/chatroom"
        element={
          <PrivateRoute>
            {/* <ChatRoom /> */}
            <ChatSection />
            {/* <FriendsPage /> */}
          </PrivateRoute>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/logout"
        element={
          <PrivateRoute>
            <Logout />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
