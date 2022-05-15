export const providerReducer = (state = { providers: [] }, action) => {
  switch (action.type) {
    case "ALL_PROVIDER_REQUEST":
      return {
        loading: true,
        providers: [],
      };
    case "ALL_PROVIDER_SUCCESS":
      return {
        loading: false,
        providers: action.payload.providers,
        providersCount: action.payload.providersCount,
        resultPerPage: action.payload.resultPerPage,
      };
    case "ALL_PROVIDER_FAIL":
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

export const getProviderDetails = (state = { details: {} }, action) => {
  switch (action.type) {
    case "PROVIDER_DETAILS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "PROVIDER_DETAILS_SUCCESS":
      return {
        loading: false,
        details: action.payload,
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

export const getSingleProvider = (state = { details: {} }, action) => {
  switch (action.type) {
    case "SINGLE_PROVIDER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "SINGLE_PROVIDER_SUCCESS":
      return {
        loading: false,
        details: action.payload,
      };
    case "SINGLE_PROVIDER_FAIL":
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

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case "NEW_REVIEW_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "NEW_REVIEW_SUCCESS":
      return {
        loading: false,
        success: action.payload,
      };
    case "NEW_REVIEW_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "NEW_REVIEW_RESET":
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

export const providerReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case "ALL_REVIEW_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ALL_REVIEW_SUCCESS":
      return {
        loading: false,
        reviews: action.payload,
      };
    case "ALL_REVIEW_FAIL":
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
