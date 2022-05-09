import axios from "axios";

import { url } from "../api/index";

export const getProviders = () => async (dispatch) => {
  try {
    dispatch({ type: "PROVIDER_REQUEST" });

    const { data } = await axios.get(`${url}/user/all/tiffin-services`);

    dispatch({ type: "PROVIDER_SUCCESS", payload: data.providers });
  } catch (error) {
    dispatch({ type: "PROVIDER_FAIL", payload: error.response.data.message });
  }
};

export const createProvider = (productData) => async (dispatch) => {
  try {
    dispatch({ type: "NEW_PROVDER_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${url}/user/tiffin/register`,
      productData,
      config
    );
    dispatch({ type: "NEW_PROVDER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "NEW_PROVDER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const getProviderDetails = (user) => async (dispatch) => {
  try {
    dispatch({ type: "PROVIDER_DETAILS_REQUEST" });

    const config = { withCredentials: true };

    const { data } = await axios.get(`${url}/user/restaurant/${user}`, config);

    dispatch({
      type: "PROVIDER_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PROVIDER_DETAILS_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
