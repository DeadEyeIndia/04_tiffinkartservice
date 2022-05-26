import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

import "./Providers.css";
import { updateProvider, clearErrors } from "../../actions/providerAction";
import Loader from "../../components/Loader/Loader";
import MetaData from "../../components/MetaData";
import LoginScreen from "../../screens/Login/LoginScreen";

const EditProvider = () => {
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : !isAuthenticated ? (
        <LoginScreen />
      ) : (
        <>
          <MetaData title="Edit Provider | TIffin Kart" />
          <div className="app__edit">
            <h1>Edit</h1>
            <form encType="multipart/form-data" className="app__editForm">
              <input type="text" placeholder={details.provider?.nameRest} />

              <input type="text" placeholder={details.provider?.addressRest} />

              <input type="text" placeholder={details.provider?.restLocality} />

              <input
                type="text"
                placeholder={details.provider?.contactNumber}
              />

              <input type="text" placeholder={details.provider?.city} />

              <input type="text" placeholder={details.provider?.state} />

              <select onChange={(e) => setTiffinType(e.target.value)}>
                <option value={`${details.provider?.tiffinType}`}>
                  Select tiffin type
                </option>
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

              <select onChange={(e) => setTiffinType(e.target.value)}>
                <option value={`${details.provider?.category}`}>
                  Select category
                </option>
                <option value="Food Mess">Food Mess</option>
                <option value="Chef/Cook">Chef/Cook</option>
                <option value="Food Mess, Chef/Cook">Both</option>
              </select>

              <select onChange={(e) => setTiffinType(e.target.value)}>
                <option value={`${details.provider?.service}`}>
                  Select service type
                </option>
                <option value="Food Mess">Food Mess</option>
                <option value="Chef/Cook">Chef/Cook</option>
                <option value="Food Mess, Chef/Cook">Both</option>
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
        </>
      )}
    </>
  );
};

export default EditProvider;
