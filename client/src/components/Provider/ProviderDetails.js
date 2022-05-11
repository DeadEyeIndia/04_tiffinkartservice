import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./ProviderDetails.css";

const ProviderDetails = () => {
  // console.log(user);
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);
  const { error, success, details } = useSelector(
    (state) => state.providerDetails
  );

  useEffect(() => {
    if (isAuthenticated && success) {
      navigate("/provider/details");
    }
  }, [navigate, isAuthenticated, success]);

  return (
    <>
      {details.success === true && details.provider !== null ? (
        <div className="app__providerDetails">
          <h2>{details.provider?.nameRest}</h2>
        </div>
      ) : (
        <>
          <h1>You have not add your Tiffin services</h1>
        </>
      )}
    </>
  );
};

export default ProviderDetails;
