import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";

import "./Search.css";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [address, setAddress] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim() && address.length >= 4) {
      navigate(`/${keyword}&${address}`);
    } else if (keyword.trim()) {
      navigate(`/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="app__search">
      <div className="app__searchImg" />
      <div className="app__searchTitle f-ai-c">
        <h1>Tiffin Kart</h1>
        <div className="app__searchInputBoxes">
          <div className="app__searchLocationInput f-ai-c">
            <LocationOnIcon className="app__searchLocation" />
            <form onSubmit={searchSubmitHandler} className="app__searchBox">
              <input
                type="text"
                placeholder="Search City ..."
                onChange={(e) => setKeyword(e.target.value)}
              />
              <input
                type="submit"
                className="app__searchSubmit"
                value="Search"
              />
            </form>
          </div>
          <div className="app__searchBreak" />
          <div className="app__searchAddress f-ai-c">
            <BusinessRoundedIcon className="app__searchLocation" />
            <form onSubmit={searchSubmitHandler}>
              <input
                type="text"
                placeholder="Address ..."
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="submit"
                value="Address"
                className="app__searchByAddress"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
