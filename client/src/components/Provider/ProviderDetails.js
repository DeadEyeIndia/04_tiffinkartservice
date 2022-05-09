import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";

import "./ProviderDetails.css";
// import Loader from "../../components/Loader/Loader";
// import { clearErrors, getProviderDetails } from "../../actions/providerAction";
import MetaData from "../../components/MetaData";

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
      <div className="app__providerDetails">
        <h2>{details.provider?.nameRest}</h2>
      </div>
    </>
  );
};

export default ProviderDetails;
