// employee/reducers.ts
const initialState = {
  getSearchApplicantList: [],
  isLoading: false,
  errorMessage: null,
  getSearchApplicantSuccess: false,
  getSearchApplicantFailure: false,
};

export default function searchApplicantReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_SEARCH_APPLICANT_SUCCESS": {
      return {
        ...state,
        getSearchApplicantSuccess: true,
        getSearchApplicantList: action.payload.data.data,
        getSearchApplicantFailure: false,
      };
    }
    case "GET_SEARCH_APPLICANT_FAILURE": {
      return {
        ...state,
        getSearchApplicantFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getSearchApplicantSuccess: false,
      };
    }
    case "RESET_GET_SEARCH_APPLICANT": {
      return {
        ...state,
        getSearchApplicantSuccess: false,
        getSearchApplicantFailure: false,
        getSearchApplicantList: [],
        errorMessage: null,
      };
    }

    case "GET_SEARCH_APPLICANT_DETAILS_SUCCESS": {
      return {
        ...state,
        getSearchApplicantDetailsSuccess: true,
        getSearchApplicantDetailsList: action.payload.data.data,
        getSearchApplicantDetailsFailure: false,
      };
    }
    case "GET_SEARCH_APPLICANT_DETAILS_FAILURE": {
      return {
        ...state,
        getSearchApplicantDetailsFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getSearchApplicantDetailsSuccess: false,
      };
    }
    case "RESET_GET_SEARCH_APPLICANT_DETAILS": {
      return {
        ...state,
        getSearchApplicantDetailsSuccess: false,
        getSearchApplicantDetailsFailure: false,
        getSearchApplicantDetailsList: [],
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
