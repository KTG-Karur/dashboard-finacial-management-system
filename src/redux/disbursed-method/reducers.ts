// employee/reducers.ts
const initialState = {
  getDisbursedMethodList: [],
  createDisbursedMethodData: null,
  updateDisbursedMethodData: null,
  isLoading: false,
  errorMessage: null,
  getDisbursedMethodSuccess: false,
  getDisbursedMethodFailure: false,
  createDisbursedMethodSuccess: false,
  createDisbursedMethodFailure: false,
  updateDisbursedMethodSuccess: false,
  updateDisbursedMethodFailure: false,
  deleteDisbursedMethodSuccess: false,
  deleteDisbursedMethodFailure: false,
};

export default function disbursedMethodReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_DISBURSED_METHOD_SUCCESS": {
      return {
        ...state,
        getDisbursedMethodSuccess: true,
        getDisbursedMethodList: action.payload.data.data,
        getDisbursedMethodFailure: false,
      };
    }
    case "GET_DISBURSED_METHOD_FAILURE": {
      return {
        ...state,
        getDisbursedMethodFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getDisbursedMethodSuccess: false,
      };
    }
    case "RESET_GET_DISBURSED_METHOD": {
      return {
        ...state,
        getDisbursedMethodSuccess: false,
        getDisbursedMethodFailure: false,
        getDisbursedMethodList: [],
        errorMessage: null,
      };
    }

    case "CREATE_DISBURSED_METHOD_SUCCESS": {
      return {
        ...state,
        createDisbursedMethodSuccess: true,
        createDisbursedMethodData: action.payload.data.data,
        createDisbursedMethodFailure: false,
      };
    }
    case "CREATE_DISBURSED_METHOD_FAILURE": {
      return {
        ...state,
        createDisbursedMethodFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createDisbursedMethodSuccess: false,
      };
    }
    case "RESET_CREATE_DISBURSED_METHOD": {
      return {
        ...state,
        createDisbursedMethodSuccess: false,
        createDisbursedMethodFailure: false,
        createDisbursedMethodData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_DISBURSED_METHOD_SUCCESS": {
      return {
        ...state,
        updateDisbursedMethodSuccess: true,
        updateDisbursedMethodData: action.payload.data.data,
        updateDisbursedMethodFailure: false,
      };
    }
    case "UPDATE_DISBURSED_METHOD_FAILURE": {
      return {
        ...state,
        updateDisbursedMethodFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateDisbursedMethodSuccess: false,
      };
    }
    case "RESET_UPDATE_DISBURSED_METHOD": {
      return {
        ...state,
        updateDisbursedMethodSuccess: false,
        updateDisbursedMethodFailure: false,
        updateDisbursedMethodData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_DISBURSED_METHOD_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteDisbursedMethodSuccess: true,
    //     deleteDisbursedMethodFailure: false,
    //   };
    // }
    // case "DELETE_DISBURSED_METHOD_FAILURE": {
    //   return {
    //     ...state,
    //     deleteDisbursedMethodFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteDisbursedMethodSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_DISBURSED_METHOD": {
    //   return {
    //     ...state,
    //     deleteDisbursedMethodSuccess: false,
    //     deleteDisbursedMethodFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
