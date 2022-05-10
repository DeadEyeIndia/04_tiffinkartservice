import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./RegisterRestScreen.css";
import LoginScreen from "../Login/LoginScreen";
import ProviderDetails from "../../components/Provider/ProviderDetails";
import MetaData from "../../components/MetaData";
import cuisinesData from "./cuisinesData.json";
import {
  clearErrors,
  createProvider,
  getProviderDetails,
} from "../../actions/providerAction";
import Loader from "../../components/Loader/Loader";

const RegisterRestScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  // console.log(user._id);

  const { details } = useSelector((state) => state.providerDetails);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProviderDetails(user._id));
    }
  }, [isAuthenticated, dispatch, user._id]);

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
      user: user._id,
    };
    console.log(user);
    console.log(newTiffin);
    dispatch(createProvider(newTiffin));
    navigate("/");
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

    console.log(files);
  };

  // useEffect(() => {
  //   if (errorTiffin) {
  //     dispatch(clearErrors());
  //   }

  //   if (success) {
  //     dispatch({ type: "NEW_TIFFIN_RESET" });
  //   }
  // }, [dispatch, errorTiffin, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : !isAuthenticated ? (
        <LoginScreen />
      ) : details ? (
        <ProviderDetails />
      ) : (
        <>
          <MetaData title="Register Provider" />
          <div className="app__registerProvider">
            <h1>Tiffin Kart</h1>
            <h4>Register your Tiffin Service</h4>
            <form encType="multipart/form-data" onSubmit={handleTiffinProvider}>
              <input
                type="text"
                placeholder="Tiffin Service Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Tiffin Service Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder="Tiffin Service Locality"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
              />
              <input
                type="text"
                placeholder="Mobile Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <select onChange={(e) => setTiffinType(e.target.value)}>
                <option value="">Select Tiffin Type</option>
                <option value="Food Mess">Food Mess</option>
                <option value="Chef/Cook">Chef/Cook</option>
                <option value="Food Mess, Chef/Cook">Both</option>
              </select>
              <div className="app__allCheckBoxes">
                {cuisinesData.map((data) => (
                  <>
                    <div className="app__chechBox">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCuisines([
                              ...cuisines,
                              {
                                value: data.value,
                              },
                            ]);
                          } else {
                            setCuisines(
                              cuisines.filter(
                                (cuisine) => cuisine.id !== data.id
                              )
                            );
                          }
                          console.log(cuisines);
                        }}
                        value={data.value}
                      />
                      <label>{data.label}</label>
                    </div>
                  </>
                ))}
              </div>
              <input
                type="file"
                name="providerImage"
                accept="image/*"
                onChange={createTiffinImagesChange}
                multiple
              />
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
              <button type="submit">Register</button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default RegisterRestScreen;

// {
//   !isAuthenticated ? (
//     <>
//       <LoginScreen />
//     </>
//   ) : (
//
//   );
// }
// // if(!isAuthenticated) {<LoginScreen />} else if(details)
//       {<ProviderDetails />} else
//       {
//         <>
//
//       }
