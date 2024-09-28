// employee/reducers.ts
const initialState = {
  getDuePaymentHistoryList: [],
  createDuePaymentHistoryData: null,
  updateDuePaymentHistoryData: null,
  isLoading: false,
  errorMessage: null,
  getDuePaymentHistorySuccess: false,
  getDuePaymentHistoryFailure: false,
  createDuePaymentHistorySuccess: false,
  createDuePaymentHistoryFailure: false,
  updateDuePaymentHistorySuccess: false,
  updateDuePaymentHistoryFailure: false,
  deleteDuePaymentHistorySuccess: false,
  deleteDuePaymentHistoryFailure: false,
};

export default function duePaymentHistoryReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_DUE_PAYMENT_HISTORY_SUCCESS": {
      return {
        ...state,
        getDuePaymentHistorySuccess: true,
        getDuePaymentHistoryList: action.payload.data.data,
        getDuePaymentHistoryFailure: false,
      };
    }
    case "GET_DUE_PAYMENT_HISTORY_FAILURE": {
      return {
        ...state,
        getDuePaymentHistoryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getDuePaymentHistorySuccess: false,
      };
    }
    case "RESET_GET_DUE_PAYMENT_HISTORY": {
      return {
        ...state,
        getDuePaymentHistorySuccess: false,
        getDuePaymentHistoryFailure: false,
        getDuePaymentHistoryList: [],
        errorMessage: null,
      };
    }

    case "CREATE_DUE_PAYMENT_HISTORY_SUCCESS": {
      return {
        ...state,
        createDuePaymentHistorySuccess: true,
        createDuePaymentHistoryData: action.payload.data.data,
        createDuePaymentHistoryFailure: false,
      };
    }
    case "CREATE_DUE_PAYMENT_HISTORY_FAILURE": {
      return {
        ...state,
        createDuePaymentHistoryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createDuePaymentHistorySuccess: false,
      };
    }
    case "RESET_CREATE_DUE_PAYMENT_HISTORY": {
      return {
        ...state,
        createDuePaymentHistorySuccess: false,
        createDuePaymentHistoryFailure: false,
        createDuePaymentHistoryData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_DUE_PAYMENT_HISTORY_SUCCESS": {
      return {
        ...state,
        updateDuePaymentHistorySuccess: true,
        updateDuePaymentHistoryData: action.payload.data.data,
        updateDuePaymentHistoryFailure: false,
      };
    }
    case "UPDATE_DUE_PAYMENT_HISTORY_FAILURE": {
      return {
        ...state,
        updateDuePaymentHistoryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateDuePaymentHistorySuccess: false,
      };
    }
    case "RESET_UPDATE_DUE_PAYMENT_HISTORY": {
      return {
        ...state,
        updateDuePaymentHistorySuccess: false,
        updateDuePaymentHistoryFailure: false,
        updateDuePaymentHistoryData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_DUE_PAYMENT_HISTORY_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteDuePaymentHistorySuccess: true,
    //     deleteDuePaymentHistoryFailure: false,
    //   };
    // }
    // case "DELETE_DUE_PAYMENT_HISTORY_FAILURE": {
    //   return {
    //     ...state,
    //     deleteDuePaymentHistoryFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteDuePaymentHistorySuccess: false,
    //   };
    // }
    // case "RESET_DELETE_DUE_PAYMENT_HISTORY": {
    //   return {
    //     ...state,
    //     deleteDuePaymentHistorySuccess: false,
    //     deleteDuePaymentHistoryFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
