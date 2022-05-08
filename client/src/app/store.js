import { configureStore, combineReducers } from "@reduxjs/toolkit";

import providerReducer from "../reducers/providerReducer";
import userReducer from "../reducers/userReducer";
import {
  newProvider,
  getProviderDetails,
} from "../reducers/newProviderReducer";
const reducer = combineReducers({
  user: userReducer,
  provider: providerReducer,
  newProvider: newProvider,
  providerDetails: getProviderDetails,
});

export const store = configureStore({
  reducer,
});
