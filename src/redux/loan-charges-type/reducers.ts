// employee/reducers.ts
const initialState = {
  getLoanChargesTypeList: [],
  createLoanChargesTypeData: null,
  updateLoanChargesTypeData: null,
  isLoading: false,
  errorMessage: null,
  getLoanChargesTypeSuccess: false,
  getLoanChargesTypeFailure: false,
  createLoanChargesTypeSuccess: false,
  createLoanChargesTypeFailure: false,
  updateLoanChargesTypeSuccess: false,
  updateLoanChargesTypeFailure: false,
  deleteLoanChargesTypeSuccess: false,
  deleteLoanChargesTypeFailure: false,
};

export default function loanChargesTypeReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_LOAN_CHARGES_TYPE_SUCCESS": {
      return {
        ...state,
        getLoanChargesTypeSuccess: true,
        getLoanChargesTypeList: action.payload.data.data,
        getLoanChargesTypeFailure: false,
      };
    }
    case "GET_LOAN_CHARGES_TYPE_FAILURE": {
      return {
        ...state,
        getLoanChargesTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getLoanChargesTypeSuccess: false,
      };
    }
    case "RESET_GET_LOAN_CHARGES_TYPE": {
      return {
        ...state,
        getLoanChargesTypeSuccess: false,
        getLoanChargesTypeFailure: false,
        getLoanChargesTypeList: [],
        errorMessage: null,
      };
    }

    case "CREATE_LOAN_CHARGES_TYPE_SUCCESS": {
      return {
        ...state,
        createLoanChargesTypeSuccess: true,
        createLoanChargesTypeData: action.payload.data.data,
        createLoanChargesTypeFailure: false,
      };
    }
    case "CREATE_LOAN_CHARGES_TYPE_FAILURE": {
      return {
        ...state,
        createLoanChargesTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createLoanChargesTypeSuccess: false,
      };
    }
    case "RESET_CREATE_LOAN_CHARGES_TYPE": {
      return {
        ...state,
        createLoanChargesTypeSuccess: false,
        createLoanChargesTypeFailure: false,
        createLoanChargesTypeData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_LOAN_CHARGES_TYPE_SUCCESS": {
      return {
        ...state,
        updateLoanChargesTypeSuccess: true,
        updateLoanChargesTypeData: action.payload.data.data,
        updateLoanChargesTypeFailure: false,
      };
    }
    case "UPDATE_LOAN_CHARGES_TYPE_FAILURE": {
      return {
        ...state,
        updateLoanChargesTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateLoanChargesTypeSuccess: false,
      };
    }
    case "RESET_UPDATE_LOAN_CHARGES_TYPE": {
      return {
        ...state,
        updateLoanChargesTypeSuccess: false,
        updateLoanChargesTypeFailure: false,
        updateLoanChargesTypeData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_LOAN_CHARGES_TYPE_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteLoanChargesTypeSuccess: true,
    //     deleteLoanChargesTypeFailure: false,
    //   };
    // }
    // case "DELETE_LOAN_CHARGES_TYPE_FAILURE": {
    //   return {
    //     ...state,
    //     deleteLoanChargesTypeFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteLoanChargesTypeSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_LOAN_CHARGES_TYPE": {
    //   return {
    //     ...state,
    //     deleteLoanChargesTypeSuccess: false,
    //     deleteLoanChargesTypeFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
