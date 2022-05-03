import React from "react";
import { Link } from "react-router-dom";

import "./Register.css";

const RegisterScreen = () => {
  return (
    <div className="app__createRegister f-c-c">
      <div className="app__createRegisterInner f-c-c">
        <h1>Tiffin Service</h1>
        <h3>Register</h3>
        <form className="app__registerForm f-c-c">
          <input type="text" placeholder="Name .." />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <div className="app__signInCreate f-sb-c">
            <Link to="/login" className="app__signInInstead">
              Sign In
            </Link>
            <button type="submit" className="app__registerButton">
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
