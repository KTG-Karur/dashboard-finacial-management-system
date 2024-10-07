// employee/reducers.ts
const initialState = {
  getContraList: [],
  getContraDetailsList: [],
  createContraData: null,
  updateContraData: null,
  isLoading: false,
  errorMessage: null,
  getContraSuccess: false,
  getContraFailure: false,
  getContraDetailsSuccess: false,
  getContraDetailsFailure: false,
  createContraSuccess: false,
  createContraFailure: false,
  updateContraSuccess: false,
  updateContraFailure: false,
  deleteContraSuccess: false,
  deleteContraFailure: false,
};

export default function contraReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_CONTRA_SUCCESS": {
      return {
        ...state,
        getContraSuccess: true,
        getContraList: action.payload.data.data,
        getContraFailure: false,
      };
    }
    case "GET_CONTRA_FAILURE": {
      return {
        ...state,
        getContraFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getContraSuccess: false,
      };
    }
    case "RESET_GET_CONTRA": {
      return {
        ...state,
        getContraSuccess: false,
        getContraFailure: false,
        getContraList: [],
        errorMessage: null,
      };
    }

    case "GET_CONTRA_DETAILS_SUCCESS": {
      return {
        ...state,
        getContraDetailsSuccess: true,
        getContraDetailsList: action.payload.data.data,
        getContraDetailsFailure: false,
      };
    }
    case "GET_CONTRA_DETAILS_FAILURE": {
      return {
        ...state,
        getContraDetailsFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getContraDetailsSuccess: false,
      };
    }
    case "RESET_GET_CONTRA_DETAILS": {
      return {
        ...state,
        getContraDetailsSuccess: false,
        getContraDetailsFailure: false,
        getContraDetailsList: [],
        errorMessage: null,
      };
    }

    case "CREATE_CONTRA_SUCCESS": {
      return {
        ...state,
        createContraSuccess: true,
        createContraData: action.payload.data.data,
        createContraFailure: false,
      };
    }
    case "CREATE_CONTRA_FAILURE": {
      return {
        ...state,
        createContraFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createContraSuccess: false,
      };
    }
    case "RESET_CREATE_CONTRA": {
      return {
        ...state,
        createContraSuccess: false,
        createContraFailure: false,
        createContraData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_CONTRA_SUCCESS": {
      return {
        ...state,
        updateContraSuccess: true,
        updateContraData: action.payload.data.data,
        updateContraFailure: false,
      };
    }
    case "UPDATE_CONTRA_FAILURE": {
      return {
        ...state,
        updateContraFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateContraSuccess: false,
      };
    }
    case "RESET_UPDATE_CONTRA": {
      return {
        ...state,
        updateContraSuccess: false,
        updateContraFailure: false,
        updateContraData: null,
        errorMessage: null,
      };
    }

    case "DELETE_CONTRA_SUCCESS": {
      return {
        ...state,
        deleteContraSuccess: true,
        deleteContraFailure: false,
      };
    }
    case "DELETE_CONTRA_FAILURE": {
      return {
        ...state,
        deleteContraFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteContraSuccess: false,
      };
    }
    case "RESET_DELETE_CONTRA": {
      return {
        ...state,
        deleteContraSuccess: false,
        deleteContraFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
