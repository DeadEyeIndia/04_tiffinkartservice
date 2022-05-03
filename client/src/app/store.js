import { configureStore } from "@reduxjs/toolkit";
import providerReducer from "../features/providerSlice.js";

export const store = configureStore({
  reducer: {
    provider: providerReducer,
  },
});
