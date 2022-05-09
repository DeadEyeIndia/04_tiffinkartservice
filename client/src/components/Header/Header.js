import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import PersonIcon from "@mui/icons-material/Person";

import "./Header.css";

import { logout } from "../../actions/userAction";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [toggleIcon, setToggleIcon] = useState(true);

  const handleLogout = () => {
    dispatch(logout());
    if (!isAuthenticated) {
      navigate("/");
    }
  };

  // const handleNav = () => {
  //   navigate("/register-restaurant");
  // };

  // const showUserDetails = () => {
  //   navigate("/account");
  // };

  return (
    <header className="header">
      <div className="header__main f-sb-c">
        <Link to="/" className="app__headerTitle">
          Tiffin Kart Icon
        </Link>
        {!isAuthenticated ? (
          <div className="app__headerButtons">
            <Link to="/register" className="app__headerSignUp">
              Register
            </Link>
            <Link to="/login" className="app__headerSignIn">
              Login
            </Link>
          </div>
        ) : (
          <>
            <div className="app__headerAfter">
              <Link to="/dashboard" className="app__headerDashboard">
                Dashboard
              </Link>
              <div className="app__headerProfile">
                <PersonIcon
                  className="app__headerProfileIcon"
                  style={{ fontSize: 36 }}
                  onClick={() => setToggleIcon(!toggleIcon)}
                />
                <div
                  className={
                    toggleIcon
                      ? "app__headerToggleHide"
                      : "app__headerToggleShow"
                  }
                >
                  <div className="app__headerUserName">{user.name}</div>
                  <div className="app__headerVewAccount">View Account</div>
                  <div className="app__headerLogout" onClick={handleLogout}>
                    Logout
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
