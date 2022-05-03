import { createSlice } from "@reduxjs/toolkit";

import fetch from "../api";

const providerSlice = createSlice({
  name: "provider",
  initialState: {
    providers: [],
  },
  reducers: {
    provider: (state, action) => {
      state.providers = action.payload;
    },
  },
});

export const { provider } = providerSlice.actions;

export const fetchProviders = () => async (dispatch) => {
  try {
    await fetch
      .get("/user/all/tiffin-services")
      .then((response) => dispatch(provider(response.data)));
  } catch (e) {
    console.error(e.message);
  }
};

export default providerSlice.reducer;
