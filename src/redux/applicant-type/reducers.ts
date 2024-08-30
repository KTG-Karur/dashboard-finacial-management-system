// employee/reducers.ts
const initialState = {
  getApplicantTypeList: [],
  createApplicantTypeData: null,
  updateApplicantTypeData: null,
  isLoading: false,
  errorMessage: null,
  getApplicantTypeSuccess: false,
  getApplicantTypeFailure: false,
  createApplicantTypeSuccess: false,
  createApplicantTypeFailure: false,
  updateApplicantTypeSuccess: false,
  updateApplicantTypeFailure: false,
  deleteApplicantTypeSuccess: false,
  deleteApplicantTypeFailure: false,
};

export default function applicantTypeReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_APPLICANT_TYPE_SUCCESS": {
      return {
        ...state,
        getApplicantTypeSuccess: true,
        getApplicantTypeList: action.payload.data.data,
        getApplicantTypeFailure: false,
      };
    }
    case "GET_APPLICANT_TYPE_FAILURE": {
      return {
        ...state,
        getApplicantTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getApplicantTypeSuccess: false,
      };
    }
    case "RESET_GET_APPLICANT_TYPE": {
      return {
        ...state,
        getApplicantTypeSuccess: false,
        getApplicantTypeFailure: false,
        getApplicantTypeList: [],
        errorMessage: null,
      };
    }

    case "CREATE_APPLICANT_TYPE_SUCCESS": {
      return {
        ...state,
        createApplicantTypeSuccess: true,
        createApplicantTypeData: action.payload.data.data,
        createApplicantTypeFailure: false,
      };
    }
    case "CREATE_APPLICANT_TYPE_FAILURE": {
      return {
        ...state,
        createApplicantTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createApplicantTypeSuccess: false,
      };
    }
    case "RESET_CREATE_APPLICANT_TYPE": {
      return {
        ...state,
        createApplicantTypeSuccess: false,
        createApplicantTypeFailure: false,
        createApplicantTypeData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_APPLICANT_TYPE_SUCCESS": {
      return {
        ...state,
        updateApplicantTypeSuccess: true,
        updateApplicantTypeData: action.payload.data.data,
        updateApplicantTypeFailure: false,
      };
    }
    case "UPDATE_APPLICANT_TYPE_FAILURE": {
      return {
        ...state,
        updateApplicantTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateApplicantTypeSuccess: false,
      };
    }
    case "RESET_UPDATE_APPLICANT_TYPE": {
      return {
        ...state,
        updateApplicantTypeSuccess: false,
        updateApplicantTypeFailure: false,
        updateApplicantTypeData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_APPLICANT_TYPE_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteApplicantTypeSuccess: true,
    //     deleteApplicantTypeFailure: false,
    //   };
    // }
    // case "DELETE_APPLICANT_TYPE_FAILURE": {
    //   return {
    //     ...state,
    //     deleteApplicantTypeFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteApplicantTypeSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_APPLICANT_TYPE": {
    //   return {
    //     ...state,
    //     deleteApplicantTypeSuccess: false,
    //     deleteApplicantTypeFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
