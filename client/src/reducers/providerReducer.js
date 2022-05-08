const providerReducer = (state = { providers: [] }, action) => {
  switch (action.type) {
    case "PROVIDER_REQUEST":
      return {
        loading: true,
      };
    case "PROVIDER_SUCCESS":
      return {
        ...state,
        loading: false,
        providers: action.payload,
      };
    case "PROVIDER_FAIL":
      return {
        ...state,
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

export default providerReducer;
