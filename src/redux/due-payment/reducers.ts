// employee/reducers.ts
const initialState = {
  getDuePaymentList: [],
  getDuePaymentDetailsList: [],
  createDuePaymentData: null,
  updateDuePaymentData: null,
  isLoading: false,
  errorMessage: null,
  getDuePaymentSuccess: false,
  getDuePaymentFailure: false,
  getDuePaymentDetailsSuccess: false,
  getDuePaymentDetailsFailure: false,
  createDuePaymentSuccess: false,
  createDuePaymentFailure: false,
  updateDuePaymentSuccess: false,
  updateDuePaymentFailure: false,
  deleteDuePaymentSuccess: false,
  deleteDuePaymentFailure: false,
};

export default function duePaymentReducer(state = initialState, action: any) {
  switch (action.type) {
    
    case "GET_DUE_PAYMENT_SUCCESS": {
      return {
        ...state,
        getDuePaymentSuccess: true,
        getDuePaymentList: action.payload.data.data,
        getDuePaymentFailure: false,
      };
    }
    case "GET_DUE_PAYMENT_FAILURE": {
      return {
        ...state,
        getDuePaymentFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getDuePaymentSuccess: false,
      };
    }
    case "RESET_GET_DUE_PAYMENT": {
      return {
        ...state,
        getDuePaymentSuccess: false,
        getDuePaymentFailure: false,
        getDuePaymentList: [],
        errorMessage: null,
      };
    }

    case "GET_INVESTOR_DUE_PAYMENT_SUCCESS": {
      return {
        ...state,
        getInvestorDuePaymentSuccess: true,
        getInvestorDuePaymentList: action.payload.data.data,
        getInvestorDuePaymentFailure: false,
      };
    }
    case "GET_INVESTOR_DUE_PAYMENT_FAILURE": {
      return {
        ...state,
        getInvestorDuePaymentFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getInvestorDuePaymentSuccess: false,
      };
    }
    case "RESET_GET_INVESTOR_DUE_PAYMENT": {
      return {
        ...state,
        getInvestorDuePaymentSuccess: false,
        getInvestorDuePaymentFailure: false,
        getInvestorDuePaymentList: [],
        errorMessage: null,
      };
    }

    case "GET_INVESTOR_DUE_PAYMENT_DETAILS_SUCCESS": {
      return {
        ...state,
        getInvestorDuePaymentDetailsSuccess: true,
        getInvestorDuePaymentDetailsList: action.payload.data.data,
        getInvestorDuePaymentDetailsFailure: false,
      };
    }
    case "GET_INVESTOR_DUE_PAYMENT_DETAILS_FAILURE": {
      return {
        ...state,
        getInvestorDuePaymentDetailsFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getInvestorDuePaymentDetailsSuccess: false,
      };
    }
    case "RESET_GET_INVESTOR_DUE_PAYMENT_DETAILS": {
      return {
        ...state,
        getInvestorDuePaymentDetailsSuccess: false,
        getInvestorDuePaymentDetailsFailure: false,
        getInvestorDuePaymentDetailsList: [],
        errorMessage: null,
      };
    }

    case "GET_DUE_PAYMENT_DETAILS_SUCCESS": {
      return {
        ...state,
        getDuePaymentDetailsSuccess: true,
        getDuePaymentDetailsList: action.payload.data.data,
        getDuePaymentDetailsFailure: false,
      };
    }
    case "GET_DUE_PAYMENT_DETAILS_FAILURE": {
      return {
        ...state,
        getDuePaymentDetailsFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getDuePaymentDetailsSuccess: false,
      };
    }
    case "RESET_GET_DUE_PAYMENT_DETAILS": {
      return {
        ...state,
        getDuePaymentDetailsSuccess: false,
        getDuePaymentDetailsFailure: false,
        getDuePaymentDetailsList: [],
        errorMessage: null,
      };
    }

    case "CREATE_DUE_PAYMENT_SUCCESS": {
      return {
        ...state,
        createDuePaymentSuccess: true,
        createDuePaymentData: action.payload.data.data,
        createDuePaymentFailure: false,
      };
    }
    case "CREATE_DUE_PAYMENT_FAILURE": {
      return {
        ...state,
        createDuePaymentFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createDuePaymentSuccess: false,
      };
    }
    case "RESET_CREATE_DUE_PAYMENT": {
      return {
        ...state,
        createDuePaymentSuccess: false,
        createDuePaymentFailure: false,
        createDuePaymentData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_DUE_PAYMENT_SUCCESS": {
      return {
        ...state,
        updateDuePaymentSuccess: true,
        updateDuePaymentData: action.payload.data.data,
        updateDuePaymentFailure: false,
      };
    }
    case "UPDATE_DUE_PAYMENT_FAILURE": {
      return {
        ...state,
        updateDuePaymentFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateDuePaymentSuccess: false,
      };
    }
    case "RESET_UPDATE_DUE_PAYMENT": {
      return {
        ...state,
        updateDuePaymentSuccess: false,
        updateDuePaymentFailure: false,
        updateDuePaymentData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_DUE_PAYMENT_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteDuePaymentSuccess: true,
    //     deleteDuePaymentFailure: false,
    //   };
    // }
    // case "DELETE_DUE_PAYMENT_FAILURE": {
    //   return {
    //     ...state,
    //     deleteDuePaymentFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteDuePaymentSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_DUE_PAYMENT": {
    //   return {
    //     ...state,
    //     deleteDuePaymentSuccess: false,
    //     deleteDuePaymentFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
