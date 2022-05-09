import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";

const Navbar = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <>
      <nav>
        {/* Logo will come here */}
        <div className="app__dashboardTitle">Tiffin Kart</div>
        <Link className="app__dashboardHome" to="/">
          <HomeIcon className="app__dashboardHomeIcon" />
          <div className="app__dashboardUserName">{user.name}</div>
        </Link>
        <div className="app__dashboardOptions">
          <p>Details</p>
          <div className="app__dashboardViewDetails">View Details</div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
