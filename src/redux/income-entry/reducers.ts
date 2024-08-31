// employee/reducers.ts
const initialState = {
  getIncomeEntryList: [],
  createIncomeEntryData: null,
  updateIncomeEntryData: null,
  isLoading: false,
  errorMessage: null,
  getIncomeEntrySuccess: false,
  getIncomeEntryFailure: false,
  createIncomeEntrySuccess: false,
  createIncomeEntryFailure: false,
  updateIncomeEntrySuccess: false,
  updateIncomeEntryFailure: false,
  deleteIncomeEntrySuccess: false,
  deleteIncomeEntryFailure: false,
};

export default function incomeEntryReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_INCOME_ENTRY_SUCCESS": {
      return {
        ...state,
        getIncomeEntrySuccess: true,
        getIncomeEntryList: action.payload.data.data,
        getIncomeEntryFailure: false,
      };
    }
    case "GET_INCOME_ENTRY_FAILURE": {
      return {
        ...state,
        getIncomeEntryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getIncomeEntrySuccess: false,
      };
    }
    case "RESET_GET_INCOME_ENTRY": {
      return {
        ...state,
        getIncomeEntrySuccess: false,
        getIncomeEntryFailure: false,
        getIncomeEntryList: [],
        errorMessage: null,
      };
    }

    case "CREATE_INCOME_ENTRY_SUCCESS": {
      return {
        ...state,
        createIncomeEntrySuccess: true,
        createIncomeEntryData: action.payload.data.data,
        createIncomeEntryFailure: false,
      };
    }
    case "CREATE_INCOME_ENTRY_FAILURE": {
      return {
        ...state,
        createIncomeEntryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createIncomeEntrySuccess: false,
      };
    }
    case "RESET_CREATE_INCOME_ENTRY": {
      return {
        ...state,
        createIncomeEntrySuccess: false,
        createIncomeEntryFailure: false,
        createIncomeEntryData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_INCOME_ENTRY_SUCCESS": {
      return {
        ...state,
        updateIncomeEntrySuccess: true,
        updateIncomeEntryData: action.payload.data.data,
        updateIncomeEntryFailure: false,
      };
    }
    case "UPDATE_INCOME_ENTRY_FAILURE": {
      return {
        ...state,
        updateIncomeEntryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateIncomeEntrySuccess: false,
      };
    }
    case "RESET_UPDATE_INCOME_ENTRY": {
      return {
        ...state,
        updateIncomeEntrySuccess: false,
        updateIncomeEntryFailure: false,
        updateIncomeEntryData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_INCOME_ENTRY_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteIncomeEntrySuccess: true,
    //     deleteIncomeEntryFailure: false,
    //   };
    // }
    // case "DELETE_INCOME_ENTRY_FAILURE": {
    //   return {
    //     ...state,
    //     deleteIncomeEntryFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteIncomeEntrySuccess: false,
    //   };
    // }
    // case "RESET_DELETE_INCOME_ENTRY": {
    //   return {
    //     ...state,
    //     deleteIncomeEntrySuccess: false,
    //     deleteIncomeEntryFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
