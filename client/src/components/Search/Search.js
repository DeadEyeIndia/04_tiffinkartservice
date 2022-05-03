import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import "./Search.css";

const Search = () => {
  return (
    <div className="search">
      <div className="search__img" />
      <div className="search__appTitle f-ai-c">
        <h1>Tiffin Service</h1>
        <div className="search__inputBoxes f-sb-c">
          <div className="search__locationInput f-c-c">
            <LocationOnIcon />
            <input type="text" placeholder="Location ..." />
          </div>
          <div className="search__break" />
          <div className="search__addressInput f-jc-s">
            <input type="text" placeholder="Address ..." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
