import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Header.css";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <header className="header">
      <div className="header__main f-sb-c">
        <Link to="/" className="app__headerTitle">
          Tiffin Kart Icon
        </Link>
        {!isAuthenticated ? (
          <div className="app__headerButtons">
            <Link to="/register" className="app__headerSignUp f-c-c">
              Register
            </Link>
            <Link to="/login" className="app__headerSignIn f-c-c">
              Login
            </Link>
          </div>
        ) : (
          <>
            <div className="app__headerAfter">
              <Link to="/dashboard" className="app__headerDashboard f-c-c">
                Dashboard
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
