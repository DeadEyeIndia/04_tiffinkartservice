import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import "./RegisterScreen.css";
import Loader from "../../components/Loader/Loader";
import { newRegister, clearErrors } from "../../actions/userAction";
import MetaData from "../../components/MetaData";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, loading, success, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [newUser, setNewUser] = useState({
    registerName: "",
    registerEmail: "",
    registerPassword: "",
  });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    dispatch(
      newRegister(
        newUser.registerName,
        newUser.registerEmail,
        newUser.registerPassword
      )
    );
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Registered successfully");
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Register User | Tiffin Kart" />
          <div className="app__createRegister f-c-c">
            <div className="app__createRegisterInner f-c-c">
              <h1>Tiffin Kart</h1>
              <h3>Register</h3>
              <form
                className="app__registerForm f-c-c"
                onSubmit={handleRegisterSubmit}
              >
                <div className="app__registerInput">
                  <input
                    type="text"
                    placeholder="Name ..."
                    name="name"
                    value={newUser.registerName}
                    onChange={(e) =>
                      setNewUser({ ...newUser, registerName: e.target.value })
                    }
                  />
                </div>
                <div className="app__registerInput">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={newUser.registerEmail}
                    onChange={(e) =>
                      setNewUser({ ...newUser, registerEmail: e.target.value })
                    }
                  />
                </div>
                <div className="app__registerInput">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={newUser.registerPassword}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        registerPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="app__signInCreate f-sb-c">
                  <Link to="/login" className="app__signInInstead">
                    Already have an account
                  </Link>
                  <button type="submit" className="app__registerButton">
                    Create account
                  </button>
                </div>
              </form>
            </div>
            <div className="app__registerBackgroundImage" />
          </div>
        </>
      )}
    </>
  );
};

export default RegisterScreen;
