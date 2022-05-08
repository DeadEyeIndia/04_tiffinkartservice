import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ProviderDetails.css";
import Loader from "../../components/Loader/Loader";
import {
  clearErrors,
  getProviderDetails,
} from "../../actions/newProviderAction";
import MetaData from "../../components/MetaData";

const ProviderDetails = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProviderDetails(user._id));
  }, [dispatch, user._id]);

  // const {
  //   nameRest,
  //   addressRest,
  //   restLocality,
  //   contactNumber,
  //   city,
  //   state,
  //   tiffinType,
  //   cuisines,
  //   images,
  //   category,
  //   service,
  // } = details;

  return <div className="app__providerDetails">Provider Details</div>;
};

export default ProviderDetails;
