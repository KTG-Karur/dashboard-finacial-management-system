// employee/reducers.ts
const initialState = {
  getFaqList: [],
  createFaqData: null,
  updateFaqData: null,
  isLoading: false,
  errorMessage: null,
  getFaqSuccess: false,
  getFaqFailure: false,
  createFaqSuccess: false,
  createFaqFailure: false,
  updateFaqSuccess: false,
  updateFaqFailure: false,
  deleteFaqSuccess: false,
  deleteFaqFailure: false,
};

export default function faqReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_FAQ_SUCCESS": {
      return {
        ...state,
        getFaqSuccess: true,
        getFaqList: action.payload.data.data,
        getFaqFailure: false,
      };
    }
    case "GET_FAQ_FAILURE": {
      return {
        ...state,
        getFaqFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getFaqSuccess: false,
      };
    }
    case "RESET_GET_FAQ": {
      return {
        ...state,
        getFaqSuccess: false,
        getFaqFailure: false,
        getFaqList: [],
        errorMessage: null,
      };
    }

    case "CREATE_FAQ_SUCCESS": {
      return {
        ...state,
        createFaqSuccess: true,
        createFaqData: action.payload.data.data,
        createFaqFailure: false,
      };
    }
    case "CREATE_FAQ_FAILURE": {
      return {
        ...state,
        createFaqFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createFaqSuccess: false,
      };
    }
    case "RESET_CREATE_FAQ": {
      return {
        ...state,
        createFaqSuccess: false,
        createFaqFailure: false,
        createFaqData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_FAQ_SUCCESS": {
      return {
        ...state,
        updateFaqSuccess: true,
        updateFaqData: action.payload.data.data,
        updateFaqFailure: false,
      };
    }
    case "UPDATE_FAQ_FAILURE": {
      return {
        ...state,
        updateFaqFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateFaqSuccess: false,
      };
    }
    case "RESET_UPDATE_FAQ": {
      return {
        ...state,
        updateFaqSuccess: false,
        updateFaqFailure: false,
        updateFaqData: null,
        errorMessage: null,
      };
    }

    case "DELETE_FAQ_SUCCESS": {
      return {
        ...state,
        deleteFaqSuccess: true,
        deleteFaqFailure: false,
      };
    }
    case "DELETE_FAQ_FAILURE": {
      return {
        ...state,
        deleteFaqFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteFaqSuccess: false,
      };
    }
    case "RESET_DELETE_FAQ": {
      return {
        ...state,
        deleteFaqSuccess: false,
        deleteFaqFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
