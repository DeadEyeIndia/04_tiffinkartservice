import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {
  providerReducer,
  newProvider,
  getProviderDetails,
} from "../reducers/providerReducer";
import { userReducer, profileReducer } from "../reducers/userReducer";
// import {
//   newProvider,
//   getProviderDetails,
// } from "../reducers/newProviderReducer";
const reducer = combineReducers({
  user: userReducer,
  provider: providerReducer,
  newProvider: newProvider,
  providerDetails: getProviderDetails,
  profile: profileReducer,
});

export const store = configureStore({
  reducer,
});
