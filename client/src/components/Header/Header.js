import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import InfoIcon from "@mui/icons-material/Info";

import "./Header.css";
import TiffinSvg from "../../images/TiffinKart.svg";
import ZSvg from "../../images/Z.svg";
import { logout } from "../../actions/userAction";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [toggleIcon, setToggleIcon] = useState(true);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleNav = () => {
    navigate("/register-restaurant");
  };

  const showUserDetails = () => {
    navigate("/account");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="header">
      <div className="header__title-login f-sb-c">
        <div className="header__mainIcon">
          <Link to="/"> Tiffin Kart Icon</Link>
        </div>
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="header__login">
              Login
            </Link>
          </>
        ) : (
          <>
            <div className="app__headerUser_logout">
              <div className="app__headerProfile">
                <PersonIcon className="app__headerProfileIcon" />
                <div className="app__headerUser">{user.name}</div>
                <div
                  className="app__headerIcon"
                  onClick={() => setToggleIcon(!toggleIcon)}
                >
                  {toggleIcon ? (
                    <>
                      <ArrowDropDownIcon />
                    </>
                  ) : (
                    <>
                      <ArrowDropUpIcon />
                      <div
                        className={
                          toggleIcon ? "app__navbarHide" : "app__navbarShow"
                        }
                      >
                        <div className="app__viewTIffin" onClick={handleNav}>
                          <BadgeIcon />
                          View Tiffin Service
                        </div>
                        <div
                          className="app__navbarMe"
                          onClick={showUserDetails}
                        >
                          <AccountBoxIcon />
                          View Account
                        </div>
                        <div className="app__navbar-aboutUs">
                          <InfoIcon />
                          About Us
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <button className="app__headerLogout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
