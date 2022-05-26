import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import "./Providers.css";
import Slider from "./Slider";
import { clearErrors } from "../../actions/providerAction";

const ProviderDetails = () => {
  const editScreen = () => {
    navigate("/dashboard/edit");
  };

  // console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);
  const { error, details } = useSelector((state) => state.providerDetails);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated && details.success) {
      navigate("/dashboard/me/details");
    }
  }, [navigate, isAuthenticated, details.success, dispatch]);

  return (
    <>
      {details.success === true && details.provider !== null ? (
        <div className="app__providerDetails">
          <div className="app__providerDetails-header">
            <h1>{details.provider?.nameRest}</h1>
            {/* <Link to="/dashboard/edit">
              <EditIcon style={{ fontSize: "18px" }} />
              Edit
            </Link> */}
          </div>

          <div className="app__providerDetails-imageSlides">
            <Slider slides={details.provider?.images} />
          </div>

          <p>
            Address: {details.provider?.restLocality}
            {", "} {details.provider?.addressRest}
          </p>

          <p>Phone: {details.provider?.contactNumber}</p>

          <p>
            City: {details.provider?.city}
            {", "}
            {details.provider?.state}
          </p>

          <p>Tiffin type: {details.provider?.tiffinType}</p>

          <p>Category: {details.provider?.category}</p>

          <p>Service: {details.provider?.service}</p>

          <p>
            One tiffin price:
            <CurrencyRupeeIcon style={{ fontSize: "18px" }} />
            {details.provider?.singleprice}
          </p>

          <p>
            A week price: <CurrencyRupeeIcon style={{ fontSize: "18px" }} />
            {details.provider?.weeklyprice}
          </p>

          <p>
            A month price: <CurrencyRupeeIcon style={{ fontSize: "18px" }} />
            {details.provider?.monthlyprice}
          </p>
        </div>
      ) : (
        <>
          <h2 className="app__registerHeader">
            You have not add your Tiffin services
          </h2>
        </>
      )}
    </>
  );
};

export default ProviderDetails;
