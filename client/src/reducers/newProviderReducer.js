export const newProvider = (state = { newProvider: {} }, action) => {
  switch (action.type) {
    case "NEW_PROVDER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "NEW_PROVDER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        newProvider: action.payload.newProvider,
      };
    case "NEW_PROVDER_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "NEW_PROVDER_RESET":
      return {
        ...state,
        success: false,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const getProviderDetails = (state = { providerDetails: {} }, action) => {
  switch (action.type) {
    case "PROVIDER_DETAILS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "PROVIDER_DETAILS_SUCCESS":
      return {
        loading: false,
        providerDetails: action.payload.providerDetails,
      };
    case "PROVIDER_DETAILS_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
