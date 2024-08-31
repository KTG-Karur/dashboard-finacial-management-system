// employee/reducers.ts
const initialState = {
  getExpenseEntryList: [],
  createExpenseEntryData: null,
  updateExpenseEntryData: null,
  isLoading: false,
  errorMessage: null,
  getExpenseEntrySuccess: false,
  getExpenseEntryFailure: false,
  createExpenseEntrySuccess: false,
  createExpenseEntryFailure: false,
  updateExpenseEntrySuccess: false,
  updateExpenseEntryFailure: false,
  deleteExpenseEntrySuccess: false,
  deleteExpenseEntryFailure: false,
};

export default function expenseEntryReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_EXPENSE_ENTRY_SUCCESS": {
      return {
        ...state,
        getExpenseEntrySuccess: true,
        getExpenseEntryList: action.payload.data.data,
        getExpenseEntryFailure: false,
      };
    }
    case "GET_EXPENSE_ENTRY_FAILURE": {
      return {
        ...state,
        getExpenseEntryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getExpenseEntrySuccess: false,
      };
    }
    case "RESET_GET_EXPENSE_ENTRY": {
      return {
        ...state,
        getExpenseEntrySuccess: false,
        getExpenseEntryFailure: false,
        getExpenseEntryList: [],
        errorMessage: null,
      };
    }

    case "CREATE_EXPENSE_ENTRY_SUCCESS": {
      return {
        ...state,
        createExpenseEntrySuccess: true,
        createExpenseEntryData: action.payload.data.data,
        createExpenseEntryFailure: false,
      };
    }
    case "CREATE_EXPENSE_ENTRY_FAILURE": {
      return {
        ...state,
        createExpenseEntryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createExpenseEntrySuccess: false,
      };
    }
    case "RESET_CREATE_EXPENSE_ENTRY": {
      return {
        ...state,
        createExpenseEntrySuccess: false,
        createExpenseEntryFailure: false,
        createExpenseEntryData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_EXPENSE_ENTRY_SUCCESS": {
      return {
        ...state,
        updateExpenseEntrySuccess: true,
        updateExpenseEntryData: action.payload.data.data,
        updateExpenseEntryFailure: false,
      };
    }
    case "UPDATE_EXPENSE_ENTRY_FAILURE": {
      return {
        ...state,
        updateExpenseEntryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateExpenseEntrySuccess: false,
      };
    }
    case "RESET_UPDATE_EXPENSE_ENTRY": {
      return {
        ...state,
        updateExpenseEntrySuccess: false,
        updateExpenseEntryFailure: false,
        updateExpenseEntryData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_EXPENSE_ENTRY_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteExpenseEntrySuccess: true,
    //     deleteExpenseEntryFailure: false,
    //   };
    // }
    // case "DELETE_EXPENSE_ENTRY_FAILURE": {
    //   return {
    //     ...state,
    //     deleteExpenseEntryFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteExpenseEntrySuccess: false,
    //   };
    // }
    // case "RESET_DELETE_EXPENSE_ENTRY": {
    //   return {
    //     ...state,
    //     deleteExpenseEntrySuccess: false,
    //     deleteExpenseEntryFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
