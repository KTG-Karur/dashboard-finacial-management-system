// employee/reducers.ts
const initialState = {
  getExpensiveTypeList: [],
  createExpensiveTypeData: null,
  updateExpensiveTypeData: null,
  isLoading: false,
  error: null,
  getExpensiveTypeSuccess: false,
  getExpensiveTypeFailure: false,
  createExpensiveTypeSuccess: false,
  createExpensiveTypeFailure: false,
  updateExpensiveTypeSuccess: false,
  updateExpensiveTypeFailure: false,
  deleteExpensiveTypeSuccess: false,
  deleteExpensiveTypeFailure: false,
};

export default function expensiveTypeReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_EXPENSIVE_TYPE_SUCCESS": {
      return {
        ...state,
        getExpensiveTypeSuccess: true,
        getExpensiveTypeList: action.payload.data.data,
        getExpensiveTypeFailure: false,
      };
    }
    case "GET_EXPENSIVE_TYPE_FAILURE": {
      return {
        ...state,
        getExpensiveTypeFailure: true,
        errorMessage: action.errorMessage,
        getExpensiveTypeSuccess: false,
      };
    }
    case "RESET_GET_EXPENSIVE_TYPE": {
      return {
        ...state,
        getExpensiveTypeSuccess: false,
        getExpensiveTypeFailure: false,
        getExpensiveTypeList: [],
        errorMessage: null,
      };
    }

    case "CREATE_EXPENSIVE_TYPE_SUCCESS": {
      return {
        ...state,
        createExpensiveTypeSuccess: true,
        createExpensiveTypeData: action.payload.data.data,
        createExpensiveTypeFailure: false,
      };
    }
    case "CREATE_EXPENSIVE_TYPE_FAILURE": {
      return {
        ...state,
        createExpensiveTypeFailure: true,
        errorMessage: action.errorMessage,
        createExpensiveTypeSuccess: false,
      };
    }
    case "RESET_CREATE_EXPENSIVE_TYPE": {
      return {
        ...state,
        createExpensiveTypeSuccess: false,
        createExpensiveTypeFailure: false,
        createExpensiveTypeData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_EXPENSIVE_TYPE_SUCCESS": {
      return {
        ...state,
        updateExpensiveTypeSuccess: true,
        updateExpensiveTypeData: action.payload.data.data,
        updateExpensiveTypeFailure: false,
      };
    }
    case "UPDATE_EXPENSIVE_TYPE_FAILURE": {
      return {
        ...state,
        updateExpensiveTypeFailure: true,
        errorMessage: action.errorMessage,
        updateExpensiveTypeSuccess: false,
      };
    }
    case "RESET_UPDATE_EXPENSIVE_TYPE": {
      return {
        ...state,
        updateExpensiveTypeSuccess: false,
        updateExpensiveTypeFailure: false,
        updateExpensiveTypeData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_EXPENSIVE_TYPE_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteExpensiveTypeSuccess: true,
    //     deleteExpensiveTypeFailure: false,
    //   };
    // }
    // case "DELETE_EXPENSIVE_TYPE_FAILURE": {
    //   return {
    //     ...state,
    //     deleteExpensiveTypeFailure: true,
    //     errorMessage: action.errorMessage,
    //     deleteExpensiveTypeSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_EXPENSIVE_TYPE": {
    //   return {
    //     ...state,
    //     deleteExpensiveTypeSuccess: false,
    //     deleteExpensiveTypeFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
