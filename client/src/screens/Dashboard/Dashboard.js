import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";

import "./Dashboard.css";
import MetaData from "../../components/MetaData";
import Loader from "../../components/Loader/Loader";

const Dashboard = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <>
      {!loading && isAuthenticated && (
        <>
          <MetaData title="Dashboard" />
          <div className="app__dashboardBody">
            <nav className="app__dashboardNav">
              {/* Logo will come here */}
              <div className="app__dashboardTitle">Tiffin Kart</div>
              <Link className="app__dashboardHome" to="/">
                <HomeIcon className="app__dashboardHomeIcon" />
                <div className="app__dashboardUserName">{user.name}</div>
              </Link>
            </nav>
            <main className="app__dashboardMain"></main>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
