import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Header.css";
import { login, logout, selectUser } from "../../features/userSlice";

const Header = () => {
  // const [toggleShow, setToggleShow] = useState(false);

  return (
    <div className="header">
      <div className="header__title-login f-sb-c">
        <Link to="/register-restaurant" className="header__addRest">
          Add restaurant
        </Link>
        <div className="header__loginArea f-jc-sb">
          <Link to="/login" className="header__login">
            Login
          </Link>
          <div className="header__signUp">Sign up</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
