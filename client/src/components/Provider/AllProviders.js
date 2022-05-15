import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useParams } from "react-router-dom";

import { getProviders, clearErrors } from "../../actions/providerAction";
import Loader from "../../components/Loader/Loader";
import "./Providers.css";

// const categories = [
//   "Vegetarian",
//   "Non-Vegetarian",
//   "Vegetarian, Non-Vegetarian",
// ];

const AllProviders = () => {
  const dispatch = useDispatch();
  const { keyword, address } = useParams();
  const alert = useAlert();

  const { error, loading, providers } = useSelector((state) => state.providers);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProviders(keyword, address));
  }, [dispatch, keyword, address, alert, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="app__providers">
            {providers &&
              providers.map((provider) => (
                <Link
                  key={provider._id}
                  to={`/provider/${provider._id}`}
                  className="app__providersItem"
                >
                  <h3 className="app__providersItem-heading">
                    {provider.nameRest}
                  </h3>

                  <img src={provider.images[0].url} alt="" />
                  <p className="app__providersItem-tiffinType">
                    Tiffin type: {provider.tiffinType}
                  </p>
                  <p className="app__providersItem-category">
                    Category: {provider.category}
                  </p>
                  <p className="app__providersItem-city">
                    City: {provider.city}
                  </p>
                </Link>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default AllProviders;
