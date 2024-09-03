// employee/reducers.ts
const initialState = {
  getEmployeeList: [],
  createEmployeeData: null,
  updateEmployeeData: null,
  isLoading: false,
  errorMessage: null,
  getEmployeeSuccess: false,
  getEmployeeFailure: false,
  createEmployeeSuccess: false,
  createEmployeeFailure: false,
  updateEmployeeSuccess: false,
  updateEmployeeFailure: false,
  deleteEmployeeSuccess: false,
  deleteEmployeeFailure: false,
};

export default function employeeReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_EMPLOYEE_SUCCESS": {
      return {
        ...state,
        getEmployeeSuccess: true,
        getEmployeeList: action.payload.data.data,
        getEmployeeFailure: false,
      };
    }
    case "GET_EMPLOYEE_FAILURE": {
      return {
        ...state,
        getEmployeeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getEmployeeSuccess: false,
      };
    }
    case "RESET_GET_EMPLOYEE": {
      return {
        ...state,
        getEmployeeSuccess: false,
        getEmployeeFailure: false,
        getEmployeeList: [],
        errorMessage: null,
      };
    }

    case "CREATE_EMPLOYEE_SUCCESS": {
      return {
        ...state,
        createEmployeeSuccess: true,
        createEmployeeData: action.payload.data.data,
        createEmployeeFailure: false,
      };
    }
    case "CREATE_EMPLOYEE_FAILURE": {
      return {
        ...state,
        createEmployeeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createEmployeeSuccess: false,
      };
    }
    case "RESET_CREATE_EMPLOYEE": {
      return {
        ...state,
        createEmployeeSuccess: false,
        createEmployeeFailure: false,
        createEmployeeData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_EMPLOYEE_SUCCESS": {
      return {
        ...state,
        updateEmployeeSuccess: true,
        updateEmployeeData: action.payload.data.data,
        updateEmployeeFailure: false,
      };
    }
    case "UPDATE_EMPLOYEE_FAILURE": {
      return {
        ...state,
        updateEmployeeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateEmployeeSuccess: false,
      };
    }
    case "RESET_UPDATE_EMPLOYEE": {
      return {
        ...state,
        updateEmployeeSuccess: false,
        updateEmployeeFailure: false,
        updateEmployeeData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_EMPLOYEE_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteEmployeeSuccess: true,
    //     deleteEmployeeFailure: false,
    //   };
    // }
    // case "DELETE_EMPLOYEE_FAILURE": {
    //   return {
    //     ...state,
    //     deleteEmployeeFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteEmployeeSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_EMPLOYEE": {
    //   return {
    //     ...state,
    //     deleteEmployeeSuccess: false,
    //     deleteEmployeeFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
