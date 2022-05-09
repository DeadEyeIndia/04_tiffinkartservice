import React, { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import HomeScreen from "./screens/Home/HomeScreen";
import Dashboard from "./screens/Dashboard/Dashboard";
import LoginScreen from "./screens/Login/LoginScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import RegisterRestScreen from "./screens/RegisterRestaurant/RegisterRestScreen";
import ProviderDetails from "./components/Provider/ProviderDetails";
import User from "./screens/User/User";

import { loadUser } from "./actions/userAction";
import { store } from "./app/store";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register-restaurant" element={<RegisterRestScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/provider/details" element={<ProviderDetails />} />
          <Route path="/account" element={<User />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
