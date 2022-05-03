import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "./HomeScreen.css";
import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";

const HomeScreen = () => {
  // const { provider } = useSelector((state) => state.provider);

  // console.log(provider);

  return (
    <>
      <Header />
      <Search />
    </>
  );
};

export default HomeScreen;

// const [provs, setProvs] = useState([]);
// useEffect(() => {
//   async function fetchData() {
//     const request = await axios.get("/user/all/tiffin-services");
//     dispatch(
//       provider({
//         result: request,
//       })
//     );

//     console.log(request);

//     return request;
//   }

//   fetchData();
// }, [dispatch]);
