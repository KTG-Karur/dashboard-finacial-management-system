// employee/reducers.ts
const initialState = {
  getApplicantList: [],
  getApplicantInfoList: [],
  createApplicantData: null,
  updateApplicantData: null,
  isLoading: false,
  errorMessage: null,
  getApplicantSuccess: false,
  getApplicantInfoSuccess: false,
  getApplicantFailure: false,
  getApplicantInfoFailure: false,
  createApplicantSuccess: false,
  createApplicantFailure: false,
  updateApplicantSuccess: false,
  updateApplicantFailure: false,
  deleteApplicantSuccess: false,
  deleteApplicantFailure: false,
};

export default function applicantReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_APPLICANT_SUCCESS": {
      return {
        ...state,
        getApplicantSuccess: true,
        getApplicantList: action.payload.data.data,
        getApplicantFailure: false,
      };
    }
    case "GET_APPLICANT_FAILURE": {
      return {
        ...state,
        getApplicantFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getApplicantSuccess: false,
      };
    }
    case "RESET_GET_APPLICANT": {
      return {
        ...state,
        getApplicantSuccess: false,
        getApplicantFailure: false,
        getApplicantList: [],
        errorMessage: null,
      };
    }
    case "GET_APPLICANT_INFO_SUCCESS": {
      return {
        ...state,
        getApplicantInfoSuccess: true,
        getApplicantInfoList: action.payload.data.data,
        getApplicantInfoFailure: false,
      };
    }
    case "GET_APPLICANT_INFO_FAILURE": {
      return {
        ...state,
        getApplicantInfoFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getApplicantInfoSuccess: false,
      };
    }
    case "RESET_GET_APPLICANT_INFO": {
      return {
        ...state,
        getApplicantInfoSuccess: false,
        getApplicantInfoFailure: false,
        getApplicantInfoList: [],
        errorMessage: null,
      };
    }

    case "CREATE_APPLICANT_SUCCESS": {
      return {
        ...state,
        createApplicantSuccess: true,
        createApplicantData: action.payload.data.data,
        createApplicantFailure: false,
      };
    }
    case "CREATE_APPLICANT_FAILURE": {
      return {
        ...state,
        createApplicantFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createApplicantSuccess: false,
      };
    }
    case "RESET_CREATE_APPLICANT": {
      return {
        ...state,
        createApplicantSuccess: false,
        createApplicantFailure: false,
        createApplicantData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_APPLICANT_SUCCESS": {
      return {
        ...state,
        updateApplicantSuccess: true,
        updateApplicantData: action.payload.data.data,
        updateApplicantFailure: false,
      };
    }
    case "UPDATE_APPLICANT_FAILURE": {
      return {
        ...state,
        updateApplicantFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateApplicantSuccess: false,
      };
    }
    case "RESET_UPDATE_APPLICANT": {
      return {
        ...state,
        updateApplicantSuccess: false,
        updateApplicantFailure: false,
        updateApplicantData: null,
        errorMessage: null,
      };
    }

    case "DELETE_APPLICANT_ADDRESS_SUCCESS": {
      return {
        ...state,
        deleteApplicantAddressSuccess: true,
        deleteApplicantAddressFailure: false,
      };
    }
    case "DELETE_APPLICANT_ADDRESS_FAILURE": {
      return {
        ...state,
        deleteApplicantAddressFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteApplicantAddressSuccess: false,
      };
    }
    case "RESET_DELETE_APPLICANT_ADDRESS": {
      return {
        ...state,
        deleteApplicantAddressSuccess: false,
        deleteApplicantAddressFailure: false,
        errorMessage: null,
      };
    }

    case "DELETE_APPLICANT_PROOF_SUCCESS": {
      return {
        ...state,
        deleteApplicantProofSuccess: true,
        deleteApplicantProofFailure: false,
      };
    }
    case "DELETE_APPLICANT_PROOF_FAILURE": {
      return {
        ...state,
        deleteApplicantProofFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteApplicantProofSuccess: false,
      };
    }
    case "RESET_DELETE_APPLICANT_PROOF": {
      return {
        ...state,
        deleteApplicantProofSuccess: false,
        deleteApplicantProofFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
