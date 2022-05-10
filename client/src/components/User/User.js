import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

import "./User.css";
import Loader from "../Loader/Loader";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);

  const { loading, error, isUpdated } = useSelector((state) => state.profile);

  const [updateUser, setUpdateUser] = useState({
    name: "",
    email: "",
  });

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProfile(updateUser));
  };

  useEffect(() => {
    if (user) {
      setUpdateUser({ ...updateUser, email: user.email, name: user.name });
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/dashboard/account");

      dispatch({ type: "UPDATE_PROFILE_RESET" });
    }
  }, [dispatch, alert, navigate, user, isUpdated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="app__userContainer">
            <h2>Profile Settings</h2>
            <form encType="multipart/form-data" onSubmit={updateProfileSubmit}>
              <div className="app__userContainer-input">
                <label>Full Name</label>
                <div className="app__userContainer-inputInner">
                  <input
                    type="text"
                    value={updateUser.name}
                    onChange={(e) =>
                      setUpdateUser({ ...updateUser, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="app__userContainer-input">
                <label>Email</label>
                <div className="app__userContainer-inputInner">
                  <input
                    type="text"
                    value={updateUser.email}
                    onChange={(e) =>
                      setUpdateUser({ ...updateUser, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Update Changes"
                className="app__userContainer-submit"
              />
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default User;
