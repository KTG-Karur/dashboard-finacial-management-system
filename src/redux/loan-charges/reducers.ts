// employee/reducers.ts
const initialState = {
  getLoanChargesList: [],
  createLoanChargesData: null,
  updateLoanChargesData: null,
  isLoading: false,
  errorMessage: null,
  getLoanChargesSuccess: false,
  getLoanChargesFailure: false,
  createLoanChargesSuccess: false,
  createLoanChargesFailure: false,
  updateLoanChargesSuccess: false,
  updateLoanChargesFailure: false,
  deleteLoanChargesSuccess: false,
  deleteLoanChargesFailure: false,
};

export default function loanChargesReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_LOANCHARGES_SUCCESS": {
      return {
        ...state,
        getLoanChargesSuccess: true,
        getLoanChargesList: action.payload.data.data,
        getLoanChargesFailure: false,
      };
    }
    case "GET_LOANCHARGES_FAILURE": {
      return {
        ...state,
        getLoanChargesFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getLoanChargesSuccess: false,
      };
    }
    case "RESET_GET_LOANCHARGES": {
      return {
        ...state,
        getLoanChargesSuccess: false,
        getLoanChargesFailure: false,
        getLoanChargesList: [],
        errorMessage: null,
      };
    }

    case "CREATE_LOANCHARGES_SUCCESS": {
      return {
        ...state,
        createLoanChargesSuccess: true,
        createLoanChargesData: action.payload.data.data,
        createLoanChargesFailure: false,
      };
    }
    case "CREATE_LOANCHARGES_FAILURE": {
      return {
        ...state,
        createLoanChargesFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createLoanChargesSuccess: false,
      };
    }
    case "RESET_CREATE_LOANCHARGES": {
      return {
        ...state,
        createLoanChargesSuccess: false,
        createLoanChargesFailure: false,
        createLoanChargesData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_LOANCHARGES_SUCCESS": {
      return {
        ...state,
        updateLoanChargesSuccess: true,
        updateLoanChargesData: action.payload.data.data,
        updateLoanChargesFailure: false,
      };
    }
    case "UPDATE_LOANCHARGES_FAILURE": {
      return {
        ...state,
        updateLoanChargesFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateLoanChargesSuccess: false,
      };
    }
    case "RESET_UPDATE_LOANCHARGES": {
      return {
        ...state,
        updateLoanChargesSuccess: false,
        updateLoanChargesFailure: false,
        updateLoanChargesData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_LOANCHARGES_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteLoanChargesSuccess: true,
    //     deleteLoanChargesFailure: false,
    //   };
    // }
    // case "DELETE_LOANCHARGES_FAILURE": {
    //   return {
    //     ...state,
    //     deleteLoanChargesFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteLoanChargesSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_LOANCHARGES": {
    //   return {
    //     ...state,
    //     deleteLoanChargesSuccess: false,
    //     deleteLoanChargesFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
