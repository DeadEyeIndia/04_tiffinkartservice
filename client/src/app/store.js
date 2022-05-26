import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {
  providerReducer,
  newProvider,
  getProviderDetails,
  newReviewReducer,
  providerReviewsReducer,
  getSingleProvider,
  providerReducerStatus,
} from "../reducers/providerReducer";
import { userReducer, profileReducer } from "../reducers/userReducer";

const reducer = combineReducers({
  user: userReducer,
  providers: providerReducer,
  newprovider: newProvider,
  providerDetails: getProviderDetails,
  profile: profileReducer,
  newReview: newReviewReducer,
  providerreview: providerReviewsReducer,
  singleprovider: getSingleProvider,
  updateProvider: providerReducerStatus,
});

export const store = configureStore({
  reducer,
});
