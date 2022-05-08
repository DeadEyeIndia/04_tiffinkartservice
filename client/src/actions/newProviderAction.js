import axios from "axios";

import { url } from "../api/index";

export const createProvider = (productData) => async (dispatch) => {
  try {
    dispatch({ type: "NEW_PROVDER_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" },
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

    const { data } = await axios.get(`${url}/user/restaurant/${user}`);

    dispatch({
      type: "PROVIDER_DETAILS_SUCCESS",
      payload: data.providerDetails,
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
