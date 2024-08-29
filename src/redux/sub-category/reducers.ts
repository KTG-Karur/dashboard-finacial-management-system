// employee/reducers.ts
const initialState = {
  getSubCategoryList: [],
  createSubCategoryData: null,
  updateSubCategoryData: null,
  isLoading: false,
  error: null,
  getSubCategorySuccess: false,
  getSubCategoryFailure: false,
  createSubCategorySuccess: false,
  createSubCategoryFailure: false,
  updateSubCategorySuccess: false,
  updateSubCategoryFailure: false,
  deleteSubCategorySuccess: false,
  deleteSubCategoryFailure: false,
};

export default function subCategoryReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_SUB_CATEGORY_SUCCESS": {
      return {
        ...state,
        getSubCategorySuccess: true,
        getSubCategoryList: action.payload.data.data,
        getSubCategoryFailure: false,
      };
    }
    case "GET_SUB_CATEGORY_FAILURE": {
      return {
        ...state,
        getSubCategoryFailure: true,
        errorMessage: action.errorMessage,
        getSubCategorySuccess: false,
      };
    }
    case "RESET_GET_SUB_CATEGORY": {
      return {
        ...state,
        getSubCategorySuccess: false,
        getSubCategoryFailure: false,
        getSubCategoryList: [],
        errorMessage: null,
      };
    }

    case "CREATE_SUB_CATEGORY_SUCCESS": {
      return {
        ...state,
        createSubCategorySuccess: true,
        createSubCategoryData: action.payload.data.data,
        createSubCategoryFailure: false,
      };
    }
    case "CREATE_SUB_CATEGORY_FAILURE": {
      return {
        ...state,
        createSubCategoryFailure: true,
        errorMessage: action.errorMessage,
        createSubCategorySuccess: false,
      };
    }
    case "RESET_CREATE_SUB_CATEGORY": {
      return {
        ...state,
        createSubCategorySuccess: false,
        createSubCategoryFailure: false,
        createSubCategoryData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_SUB_CATEGORY_SUCCESS": {
      return {
        ...state,
        updateSubCategorySuccess: true,
        updateSubCategoryData: action.payload.data.data,
        updateSubCategoryFailure: false,
      };
    }
    case "UPDATE_SUB_CATEGORY_FAILURE": {
      return {
        ...state,
        updateSubCategoryFailure: true,
        errorMessage: action.errorMessage,
        updateSubCategorySuccess: false,
      };
    }
    case "RESET_UPDATE_SUB_CATEGORY": {
      return {
        ...state,
        updateSubCategorySuccess: false,
        updateSubCategoryFailure: false,
        updateSubCategoryData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_SUB_CATEGORY_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteSubCategorySuccess: true,
    //     deleteSubCategoryFailure: false,
    //   };
    // }
    // case "DELETE_SUB_CATEGORY_FAILURE": {
    //   return {
    //     ...state,
    //     deleteSubCategoryFailure: true,
    //     errorMessage: action.errorMessage,
    //     deleteSubCategorySuccess: false,
    //   };
    // }
    // case "RESET_DELETE_SUB_CATEGORY": {
    //   return {
    //     ...state,
    //     deleteSubCategorySuccess: false,
    //     deleteSubCategoryFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
