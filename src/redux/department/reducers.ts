// employee/reducers.ts
const initialState = {
  getDepartmentList: [],
  createDepartmentData: null,
  updateDepartmentData: null,
  isLoading: false,
  error: null,
  getDepartmentSuccess: false,
  getDepartmentFailure: false,
  createDepartmentSuccess: false,
  createDepartmentFailure: false,
  updateDepartmentSuccess: false,
  updateDepartmentFailure: false,
};
  
export default function departmentReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_DEPARTMENT_SUCCESS": {
      return {
        ...state,
        getDepartmentSuccess: true,
        getDepartmentList: action.payload.data.data,
        getDepartmentFailure: false,
      };
    }
    case "GET_DEPARTMENT_FAILURE": {
      return {
        ...state,
        getDepartmentFailure: true,
        errorMessage: action.errorMessage,
        getDepartmentSuccess: false,
      };
    }
    case "RESET_GET_DEPARTMENT": {
      return {
        ...state,
        getDepartmentSuccess: false,
        getDepartmentFailure: false,
        getDepartmentList: [],
        errorMessage: null,
      };
    }
    
    case "CREATE_DEPARTMENT_SUCCESS": {
      return {
        ...state,
        createDepartmentSuccess: true,
        createDepartmentData: action.payload.data,
        createDepartmentFailure: false,
      };
    }
    case "CREATE_DEPARTMENT_FAILURE": {
      return {
        ...state,
        createDepartmentFailure: true,
        errorMessage: action.errorMessage,
        createDepartmentSuccess: false,
      };
    }
    case "RESET_CREATE_DEPARTMENT": {
      return {
        ...state,
        createDepartmentSuccess: false,
        createDepartmentFailure: false,
        createDepartmentData: null,
        errorMessage: null,
      };
    }
    
    case "UPDATE_DEPARTMENT_SUCCESS": {
      return {
        ...state,
        updateDepartmentSuccess: true,
        updateDepartmentData: action.payload.data,
        updateDepartmentFailure: false,
      };
    }
    case "UPDATE_DEPARTMENT_FAILURE": {
      return {
        ...state,
        updateDepartmentFailure: true,
        errorMessage: action.errorMessage,
        updateDepartmentSuccess: false,
      };
    }
    case "RESET_UPDATE_DEPARTMENT": {
      return {
        ...state,
        updateDepartmentSuccess: false,
        updateDepartmentFailure: false,
        updateDepartmentData: null,
        errorMessage: null,
      };
    }
    
    default: {
      return state;
    }
  }
}
