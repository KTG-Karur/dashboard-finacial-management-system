// employee/reducers.ts
const initialState = {
  getAddLoanList: [],
  createAddLoanData: null,
  updateAddLoanData: null,
  isLoading: false,
  errorMessage: null,
  getAddLoanSuccess: false,
  getAddLoanFailure: false,
  createAddLoanSuccess: false,
  createAddLoanFailure: false,
  updateAddLoanSuccess: false,
  updateAddLoanFailure: false,
  deleteAddLoanSuccess: false,
  deleteAddLoanFailure: false,
};

export default function addLoanReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_ADDLOAN_SUCCESS": {
      return {
        ...state,
        getAddLoanSuccess: true,
        getAddLoanList: action.payload.data.data,
        getAddLoanFailure: false,
      };
    }
    case "GET_ADDLOAN_FAILURE": {
      return {
        ...state,
        getAddLoanFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getAddLoanSuccess: false,
      };
    }
    case "RESET_GET_ADDLOAN": {
      return {
        ...state,
        getAddLoanSuccess: false,
        getAddLoanFailure: false,
        getAddLoanList: [],
        errorMessage: null,
      };
    }

    case "CREATE_ADDLOAN_SUCCESS": {
      return {
        ...state,
        createAddLoanSuccess: true,
        createAddLoanData: action.payload.data.data,
        createAddLoanFailure: false,
      };
    }
    case "CREATE_ADDLOAN_FAILURE": {
      return {
        ...state,
        createAddLoanFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createAddLoanSuccess: false,
      };
    }
    case "RESET_CREATE_ADDLOAN": {
      return {
        ...state,
        createAddLoanSuccess: false,
        createAddLoanFailure: false,
        createAddLoanData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_ADDLOAN_SUCCESS": {
      return {
        ...state,
        updateAddLoanSuccess: true,
        updateAddLoanData: action.payload.data.data,
        updateAddLoanFailure: false,
      };
    }
    case "UPDATE_ADDLOAN_FAILURE": {
      return {
        ...state,
        updateAddLoanFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateAddLoanSuccess: false,
      };
    }
    case "RESET_UPDATE_ADDLOAN": {
      return {
        ...state,
        updateAddLoanSuccess: false,
        updateAddLoanFailure: false,
        updateAddLoanData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_ADDLOAN_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteAddLoanSuccess: true,
    //     deleteAddLoanFailure: false,
    //   };
    // }
    // case "DELETE_ADDLOAN_FAILURE": {
    //   return {
    //     ...state,
    //     deleteAddLoanFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteAddLoanSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_ADDLOAN": {
    //   return {
    //     ...state,
    //     deleteAddLoanSuccess: false,
    //     deleteAddLoanFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
