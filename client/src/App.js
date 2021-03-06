import React, { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomeScreen from "./screens/Home/HomeScreen";
import Dashboard from "./screens/Dashboard/Dashboard";
import LoginScreen from "./screens/Login/LoginScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import RegisterRestScreen from "./screens/RegisterRestaurant/RegisterRestScreen";
import ProviderDetails from "./components/Provider/ProviderDetails";
import User from "./components/User/User";
import SingleProvider from "./components/Provider/SingleProvider";
import EditProvider from "./components/Provider/EditProvider";

import { loadUser } from "./actions/userAction";
import { store } from "./app/store";
import Reviews from "./components/Provider/Reviews";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/:keyword" element={<HomeScreen />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route index path="account" element={<User />} />
            <Route path="me/details" element={<ProviderDetails />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="edit" element={<EditProvider />} />
          </Route>
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />
          <Route path="register-restaurant" element={<RegisterRestScreen />} />
          <Route path="provider/:id" element={<SingleProvider />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
