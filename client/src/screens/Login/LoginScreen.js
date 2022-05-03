import React from "react";
import { Link } from "react-router-dom";

import "./LoginScreen.css";

const LoginScreen = () => {
  return (
    <div className="app__login f-c-c">
      <div className="app__loginInner f-c-c">
        <h1>Tiffin Service</h1>
        <h3>Login</h3>
        <form className="app-loginForm f-c-c">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <div className="app__loginCreate f-sb-c">
            <Link to="/register" className="app__register">
              Create account
            </Link>
            <button type="submit" className="app__loginButton">
              Login
            </button>
          </div>

          <Link to="/forget" className="app__forget f-jc-s">
            Forget Password?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
