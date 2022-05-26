import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

import "./RegisterRestScreen.css";
import LoginScreen from "../Login/LoginScreen";
import ProviderDetails from "../../components/Provider/ProviderDetails";
import MetaData from "../../components/MetaData";
import {
  clearErrors,
  createProvider,
  getProviderDetails,
} from "../../actions/providerAction";
import Loader from "../../components/Loader/Loader";

const RegisterRestScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const { details, error } = useSelector((state) => state.providerDetails);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [locality, setLocality] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [tiffinType, setTiffinType] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [service, setService] = useState("");
  const [singleTiffin, setSingleTiffin] = useState("");
  const [weeklyTiffin, setWeeklyTiffin] = useState("");
  const [monthlyTiffin, setMonthlyTiffin] = useState("");

  const handleTiffinProvider = (e) => {
    e.preventDefault();

    const newTiffin = {
      name: user.name,
      email: user.email,
      nameRest: name,
      addressRest: address,
      restLocality: locality,
      contactNumber: number,
      city: city,
      state: state,
      tiffinType: tiffinType,
      cuisines: cuisines.toString(),
      images: images,
      category: category,
      service: service,
      singleprice: singleTiffin,
      weeklyprice: weeklyTiffin,
      monthlyprice: monthlyTiffin,
      user: user._id,
    };
    // console.log(user);
    // console.log(newTiffin);
    dispatch(createProvider(newTiffin));
    if (details.success === true) {
      dispatch({ type: "NEW_PROVDER_RESET" });
      navigate("/dashboard/me/details");
    }
  };

  const createTiffinImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      navigate("/register-restaurant");
    }

    if (isAuthenticated) {
      dispatch(getProviderDetails(user._id));
    }

    // if (details.success === true) {
    //   dispatch({ type: "NEW_PROVDER_RESET" });
    //   // navigate("/dashboard/me/details");
    // }
  }, [dispatch, error, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : !isAuthenticated ? (
        <LoginScreen />
      ) : details.provider !== null ? (
        <ProviderDetails />
      ) : (
        <>
          <MetaData title="Register Provider" />
          <div className="app__registerProvider">
            <div className="app__registerProvider-sideImage" />
            <div className="app__registerProvider-sideRegister">
              <h1>Tiffin Kart</h1>
              <h4>Register your Tiffin Service</h4>
              <form
                encType="multipart/form-data"
                onSubmit={handleTiffinProvider}
                className="app__registerProvider-form"
              >
                <input
                  type="text"
                  placeholder="Tiffin Service Name"
                  className="app__registerProvider-registerInput"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Tiffin Service Address"
                  className="app__registerProvider-registerInput"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Tiffin Service Locality"
                  className="app__registerProvider-registerInput"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className="app__registerProvider-registerInput"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter City"
                  className="app__registerProvider-registerInput"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter state"
                  className="app__registerProvider-registerInput"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <select onChange={(e) => setTiffinType(e.target.value)}>
                  <option value="">Select Tiffin Type</option>
                  <option value="Food Mess">Food Mess</option>
                  <option value="Chef/Cook">Chef/Cook</option>
                  <option value="Food Mess, Chef/Cook">Both</option>
                </select>
                <div>
                  <input
                    type="file"
                    name="providerImage"
                    accept="image/*"
                    onChange={createTiffinImagesChange}
                    multiple
                  />
                </div>
                <select onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Select Category</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegetarian, Non-Vegetarian">Both</option>
                </select>
                <select onChange={(e) => setService(e.target.value)}>
                  <option value="">Select Service Type</option>
                  <option value="Home Delivery">Home Delivery</option>
                  <option value="At Premises">At Premises</option>
                  <option value="Home Delivery, At Premises">Both</option>
                </select>
                <input
                  type="text"
                  placeholder="One day tiffin price"
                  className="app__registerProvider-registerInput"
                  value={singleTiffin}
                  onChange={(e) => setSingleTiffin(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="A week tiffin price"
                  className="app__registerProvider-registerInput"
                  value={weeklyTiffin}
                  onChange={(e) => setWeeklyTiffin(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="A month tiffin price"
                  className="app__registerProvider-registerInput"
                  value={monthlyTiffin}
                  onChange={(e) => setMonthlyTiffin(e.target.value)}
                />
                <button type="submit">Register</button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RegisterRestScreen;
