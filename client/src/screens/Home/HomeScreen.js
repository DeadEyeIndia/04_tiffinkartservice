import React from "react";

import "./HomeScreen.css";
import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import AllProviders from "../../components/Provider/AllProviders";

import MetaData from "../../components/MetaData";

const HomeScreen = () => {
  return (
    <>
      <MetaData title="Tiffin Kart" />
      <div className="app__homeScreen">
        <Header />
        <Search />
        <AllProviders />
      </div>
    </>
  );
};

export default HomeScreen;
