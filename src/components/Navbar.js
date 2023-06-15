import React from "react";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useDecodedToken from "../utils/utility";
import { toast } from "react-toastify";
import axios from "axios";
import { GiAbstract006 } from "react-icons/gi";

const Navbar = () => {
  const navigate = useNavigate();
  const token = Cookies.get("currentUser");
  const decodedToken = useDecodedToken(token);

  const userInfo = { ...decodedToken };
  console.log(userInfo.username);
  console.log(userInfo.id);
  const id = userInfo.id;

  const handleLogout = async (id) => {
    // Remove the 'currentUser' cookie
    try {
      // Make a POST request to the register endpoint
      const response = await axios.put(
        `http://localhost:9000/users/${id}`,
        {
          status: "inactive",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Display success message
      toast.success("Logout Successfull");

      Cookies.remove("currentUser");

      navigate("/login");
    } catch (error) {
      console.log(error);

      // Handle registration errors
      toast.error(`Logout failed due to this error: ${error}`);
    }
  };
  return (
    // <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //   <div className="container">
    //     <Link className="navbar-brand" to="/">
    //       Home
    //     </Link>
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-toggle="collapse"
    //       data-target="#navbarNav"
    //       aria-controls="navbarNav"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarNav">
    //       <ul className="navbar-nav">
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/profile">
    //             Profile
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/settings">
    //             Settings
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a class="navbar-brand" href="/">
            <GiAbstract006 className="mx-1" />
            Smedia
          </a>
          {token && (
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link" to="/newpost">
                  Create a post
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" aria-current="page" to="/friends">
                  Friends
                </Link>
              </li>
              {/* <li class="nav-item">
          <Link class="nav-link" to="/profile"></Link>
        </li> */}

              <li className="nav-item">
                {/* <a href></a> */}

                <Link className="nav-link" to={`/profile/${id}`}>
                  {userInfo.username}
                </Link>
              </li>

              <li className="nav-item">
                {/* <a href></a> */}

                <Link className="nav-link" to="/chatroom">
                  Chat
                </Link>
              </li>
              {/* <li class="nav-item">
          <Link class="nav-link disabled">Disabled</Link>
        </li> */}
            </ul>
          )}

          {token && (
            <div className="d-flex">
              <button
                onClick={() => handleLogout(id)}
                type="button"
                class="btn btn-outline-danger"
              >
                <a>Logout</a>
              </button>
            </div>
          )}

          {/* <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
