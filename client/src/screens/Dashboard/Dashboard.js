import React, { useEffect } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import "./Dashboard.css";
import MetaData from "../../components/MetaData";
import Loader from "../../components/Loader/Loader";
import LoginScreen from "../Login/LoginScreen";
import User from "../../components/User/User";
import ProviderDetails from "../../components/Provider/ProviderDetails";
import Reviews from "../../components/Reviews/Reviews";
import { logout } from "../../actions/userAction";
import { getProviderDetails } from "../../actions/providerAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const { details } = useSelector((state) => state.providerDetails);

  const handleHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
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
            <div className="app__dashboardNav">
              <div className="app__dashboardOverview">
                <ArrowBackIcon
                  className="app__dashboardArrow"
                  onClick={handleHome}
                />
                <div className="app__dashboardUser">
                  <h2>{user.name}</h2>
                  <p>{user.email}</p>
                </div>

                {details.success === true && details.provider !== null ? (
                  <>
                    <div className="app__dashboardOverview-review">
                      <span>Total Reviews</span>
                      <span>{details.provider?.numOfReviews.length}</span>
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
                        <Link
                          to="/register-restaurant"
                          className="app__dashboardLink"
                        >
                          Click here!
                        </Link>
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
            <main className="app__dashboardMain">
              <div className="app__dashboardMain-header">
                <h1>Welcome, {user.name}!</h1>
                <div className="app__dashboardMain_navLink">
                  <Link to="/dashboard/account">Profile Settings</Link>
                  <Link to="/dashboard/provider/details">Provider Details</Link>
                  <Link to="/dashboard/reviews">Feedback</Link>
                </div>
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

// {
//   !loading && isAuthenticated && (
//     <>
//       <MetaData title="Dashboard" />
//       <div className="app__dashboardBody">
//         <nav className="app__dashboardNav">
//           {/* Logo will come here */}
//           <div className="app__dashboardTitle">Tiffin Kart</div>
//           <Link className="app__dashboardHome" to="/">
//             <HomeIcon className="app__dashboardHomeIcon" />
//             <div className="app__dashboardUserName">{user.name}</div>
//           </Link>
//         </nav>
//         <main className="app__dashboardMain"></main>
//       </div>
//     </>
//   );
// }
