// employee/reducers.ts
const initialState = {
  getEnquiryList: [],
  createEnquiryData: null,
  updateEnquiryData: null,
  isLoading: false,
  errorMessage: null,
  getEnquirySuccess: false,
  getEnquiryFailure: false,
  createEnquirySuccess: false,
  createEnquiryFailure: false,
  updateEnquirySuccess: false,
  updateEnquiryFailure: false,
  deleteEnquirySuccess: false,
  deleteEnquiryFailure: false,
};

export default function enquiryReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_ENQUIRY_SUCCESS": {
      return {
        ...state,
        getEnquirySuccess: true,
        getEnquiryList: action.payload.data.data,
        getEnquiryFailure: false,
      };
    }
    case "GET_ENQUIRY_FAILURE": {
      return {
        ...state,
        getEnquiryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getEnquirySuccess: false,
      };
    }
    case "RESET_GET_ENQUIRY": {
      return {
        ...state,
        getEnquirySuccess: false,
        getEnquiryFailure: false,
        getEnquiryList: [],
        errorMessage: null,
      };
    }

    case "CREATE_ENQUIRY_SUCCESS": {
      return {
        ...state,
        createEnquirySuccess: true,
        createEnquiryData: action.payload.data.data,
        createEnquiryFailure: false,
      };
    }
    case "CREATE_ENQUIRY_FAILURE": {
      return {
        ...state,
        createEnquiryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createEnquirySuccess: false,
      };
    }
    case "RESET_CREATE_ENQUIRY": {
      return {
        ...state,
        createEnquirySuccess: false,
        createEnquiryFailure: false,
        createEnquiryData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_ENQUIRY_SUCCESS": {
      return {
        ...state,
        updateEnquirySuccess: true,
        updateEnquiryData: action.payload.data.data,
        updateEnquiryFailure: false,
      };
    }
    case "UPDATE_ENQUIRY_FAILURE": {
      return {
        ...state,
        updateEnquiryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateEnquirySuccess: false,
      };
    }
    case "RESET_UPDATE_ENQUIRY": {
      return {
        ...state,
        updateEnquirySuccess: false,
        updateEnquiryFailure: false,
        updateEnquiryData: null,
        errorMessage: null,
      };
    }

    case "DELETE_ENQUIRY_SUCCESS": {
      return {
        ...state,
        deleteEnquirySuccess: true,
        deleteEnquiryFailure: false,
      };
    }
    case "DELETE_ENQUIRY_FAILURE": {
      return {
        ...state,
        deleteEnquiryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteEnquirySuccess: false,
      };
    }
    case "RESET_DELETE_ENQUIRY": {
      return {
        ...state,
        deleteEnquirySuccess: false,
        deleteEnquiryFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
