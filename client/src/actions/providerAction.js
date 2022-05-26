import axios from "axios";

import { url } from "../api/index";

export const getProviders =
  (keyword = "", address = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: "ALL_PROVIDER_REQUEST" });

      let link = `${url}/providers?keyword=${keyword}`;

      if (address) {
        link = `${url}/providers?keyword=${keyword}&address=${address}`;
      }

      const { data } = await axios.get(link);

      dispatch({ type: "ALL_PROVIDER_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "ALL_PROVIDER_FAIL",
        payload: error.response.data.message,
      });
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
      `${url}/provider/register`,
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

export const singleProvider = (id) => async (dispatch) => {
  try {
    dispatch({ type: "SINGLE_PROVIDER_REQUEST" });

    const config = { withCredentials: true };

    const { data } = await axios.get(`${url}/provider/${id}`, config);

    dispatch({ type: "SINGLE_PROVIDER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "SINGLE_PROVIDER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: "NEW_REVIEW_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.put(`${url}/review`, reviewData, config);

    dispatch({ type: "NEW_REVIEW_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "NEW_REVIEW_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: "ALL_REVIEW_REQUEST" });

    const config = { withCredentials: true };

    const { data } = await axios.get(`${url}/allreviews?id=${id}`, config);

    dispatch({
      type: "ALL_REVIEW_SUCCESS",
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: "ALL_REVIEW_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const updateProvider = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PROVIDER_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${url}/provider/update/${id}`,
      productData,
      config
    );

    dispatch({
      type: "UPDATE_PROVIDER_SUCCESS",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_PROVIDER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const deleteProvider = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_PROVIDER_REQUEST" });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.delete(`${url}/provider/delete/${id}`, config);

    dispatch({
      type: "DELETE_PROVIDER_SUCCESS",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_PROVIDER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
