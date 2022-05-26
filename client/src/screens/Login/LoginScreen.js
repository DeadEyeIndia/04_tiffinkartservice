import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import "./LoginScreen.css";
import Loader from "../../components/Loader/Loader";
import { login, clearErrors } from "../../actions/userAction";
import MetaData from "../../components/MetaData";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(user.email, user.password));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, isAuthenticated, navigate, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="LOGIN | Tiffin Kart" />
          <div className="app__login">
            <div className="app__loginBackgroundImage" />
            <div className="app__loginInner">
              <h1>Tiffin Kart</h1>
              <h3>Login</h3>
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="app-loginForm f-c-c"
              >
                <div className="app__loginInput">
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    placeholder="Email"
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
                <div className="app__loginInput">
                  <input
                    type="password"
                    name="pwd"
                    value={user.password}
                    placeholder="Password"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>
                <div className="app__loginCreate f-sb-c">
                  <Link to="/register" className="app__register">
                    Create account
                  </Link>
                  <button type="submit" className="app__loginButton">
                    Login
                  </button>
                </div>

                <Link to="/forget" className="app__forget f-jc-s">
                  Forget Password?
                </Link>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginScreen;
