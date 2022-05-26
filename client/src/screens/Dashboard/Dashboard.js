import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import "./Dashboard.css";
import MetaData from "../../components/MetaData";
import Loader from "../../components/Loader/Loader";
import LoginScreen from "../Login/LoginScreen";
import { logout } from "../../actions/userAction";
import { getProviderDetails } from "../../actions/providerAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const { error, details } = useSelector((state) => state.providerDetails);

  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  const handleHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleRegsiterPage = () => {
    navigate("/register-restaurant");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }

    navigate("/dashboard/account");

    if (isAuthenticated) {
      dispatch(getProviderDetails(user._id));
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 1200) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : !isAuthenticated ? (
        <LoginScreen />
      ) : (
        <>
          <MetaData title="Dashboard | TIffin Kart" />

          <div className="app__dashboard">
            {!activeMenu && (
              <>
                <div
                  className="app__dashboardMenu"
                  onClick={() => setActiveMenu(!activeMenu)}
                >
                  <MenuIcon />
                </div>
              </>
            )}
            {activeMenu && (
              <>
                <div className="app__dashboardNav">
                  <div className="app__dashboardOverview">
                    <div className="app__dashboardIcons">
                      <ArrowBackIcon
                        className="app__dashboardArrow"
                        onClick={handleHome}
                      />

                      <div
                        className="app__dashboardCross"
                        onClick={() => setActiveMenu(!activeMenu)}
                      >
                        <CloseIcon />
                      </div>
                    </div>
                    <div className="app__dashboardUser">
                      <h2>{user.name}</h2>
                      <p>{user.email}</p>
                    </div>

                    {details.success === true && details.provider !== null ? (
                      <>
                        <div className="app__dashboardOverview-review">
                          <span>Total Reviews</span>
                          <span>{details.provider?.numOfReviews}</span>
                        </div>
                        <p className="app__dashboardOverview-provider">
                          Provider's image
                        </p>
                        <img
                          className="app__dashboardOverview-image"
                          src={details.provider?.images[0].url}
                          alt=""
                        />
                      </>
                    ) : (
                      <>
                        <div className="app__dashboardNoUser">
                          <span>
                            If you want to add your tiffin service{" "}
                            <div
                              onClick={handleRegsiterPage}
                              className="app__dashboardLink"
                            >
                              Click here!
                            </div>
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="app__dashboardLogout">
                    <div
                      className="app__dashboardLogoutInner"
                      onClick={handleLogout}
                    >
                      <ExitToAppIcon className="app__dashboardExit" />
                      Logout
                    </div>
                  </div>
                </div>
              </>
            )}
            <main className="app__dashboardMain">
              <div className="app__dashboardMain-header">
                <h1>Welcome, {user.name}!</h1>
                <nav className="app__dashboardMain_navLink">
                  <NavLink
                    exact="true"
                    activeclassname="active"
                    to="/dashboard/account"
                  >
                    Profile Settings
                  </NavLink>
                  <NavLink activeclassname="active" to="/dashboard/me/details">
                    Provider Details
                  </NavLink>

                  {details.success === true && details.provider !== null && (
                    <NavLink activeclassname="active" to="/dashboard/reviews">
                      Feedback
                    </NavLink>
                  )}
                </nav>
                <Outlet />
              </div>
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
