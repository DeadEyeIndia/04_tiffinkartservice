import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Loader from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";
import MetaData from "../../components/MetaData";

const User = () => {
  const navigate = useNavigate();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name} Profile`} />
          <Header />
          <div className="app__userContainer">
            <div>
              <h1>My Account</h1>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default User;
