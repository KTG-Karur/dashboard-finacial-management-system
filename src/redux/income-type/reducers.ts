// employee/reducers.ts
const initialState = {
  getIncomeTypeList: [],
  createIncomeTypeData: null,
  updateIncomeTypeData: null,
  isLoading: false,
  errorMessage: null,
  getIncomeTypeSuccess: false,
  getIncomeTypeFailure: false,
  createIncomeTypeSuccess: false,
  createIncomeTypeFailure: false,
  updateIncomeTypeSuccess: false,
  updateIncomeTypeFailure: false,
  deleteIncomeTypeSuccess: false,
  deleteIncomeTypeFailure: false,
};

export default function incomeTypeReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_INCOME_TYPE_SUCCESS": {
      return {
        ...state,
        getIncomeTypeSuccess: true,
        getIncomeTypeList: action.payload.data.data,
        getIncomeTypeFailure: false,
      };
    }
    case "GET_INCOME_TYPE_FAILURE": {
      return {
        ...state,
        getIncomeTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getIncomeTypeSuccess: false,
      };
    }
    case "RESET_GET_INCOME_TYPE": {
      return {
        ...state,
        getIncomeTypeSuccess: false,
        getIncomeTypeFailure: false,
        getIncomeTypeList: [],
        errorMessage: null,
      };
    }

    case "CREATE_INCOME_TYPE_SUCCESS": {
      return {
        ...state,
        createIncomeTypeSuccess: true,
        createIncomeTypeData: action.payload.data.data,
        createIncomeTypeFailure: false,
      };
    }
    case "CREATE_INCOME_TYPE_FAILURE": {
      return {
        ...state,
        createIncomeTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createIncomeTypeSuccess: false,
      };
    }
    case "RESET_CREATE_INCOME_TYPE": {
      return {
        ...state,
        createIncomeTypeSuccess: false,
        createIncomeTypeFailure: false,
        createIncomeTypeData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_INCOME_TYPE_SUCCESS": {
      return {
        ...state,
        updateIncomeTypeSuccess: true,
        updateIncomeTypeData: action.payload.data.data,
        updateIncomeTypeFailure: false,
      };
    }
    case "UPDATE_INCOME_TYPE_FAILURE": {
      return {
        ...state,
        updateIncomeTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateIncomeTypeSuccess: false,
      };
    }
    case "RESET_UPDATE_INCOME_TYPE": {
      return {
        ...state,
        updateIncomeTypeSuccess: false,
        updateIncomeTypeFailure: false,
        updateIncomeTypeData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_INCOME_TYPE_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteIncomeTypeSuccess: true,
    //     deleteIncomeTypeFailure: false,
    //   };
    // }
    // case "DELETE_INCOME_TYPE_FAILURE": {
    //   return {
    //     ...state,
    //     deleteIncomeTypeFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteIncomeTypeSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_INCOME_TYPE": {
    //   return {
    //     ...state,
    //     deleteIncomeTypeSuccess: false,
    //     deleteIncomeTypeFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
