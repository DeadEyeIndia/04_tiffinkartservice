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

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
