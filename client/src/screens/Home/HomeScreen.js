import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

import "./HomeScreen.css";
import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import Loader from "../../components/Loader/Loader";
import { getProviders, clearErrors } from "../../actions/providerAction";
import MetaData from "../../components/MetaData";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, providers } = useSelector((state) => state.provider);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProviders());
  }, [dispatch, alert, error]);
  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <MetaData title="Tiffin Kart" />
          <div className="app__homeScreen">
            <Header />
            {/* <Search /> */}
            <div className="app__providersList">
              {providers &&
                providers.map((provider) => (
                  <div key={provider._id} className="app__tiffinProviders">
                    <h3>Tiffin Wala: {provider.nameRest}</h3>
                    <p>Contact: {provider.contactNumber}</p>
                    <p>Tiffin type: {provider.tiffinType}</p>
                    <img src={provider.images[0].url} alt="" />
                    <p>Category: {provider.category}</p>
                    <p>Service: {provider.service}</p>
                    <p>City: {provider.city}</p>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
