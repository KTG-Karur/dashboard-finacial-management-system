// employee/reducers.ts
const initialState = {
  getCategoryList: [],
  createCategoryData: null,
  updateCategoryData: null,
  isLoading: false,
  errorMessage: null,
  getCategorySuccess: false,
  getCategoryFailure: false,
  createCategorySuccess: false,
  createCategoryFailure: false,
  updateCategorySuccess: false,
  updateCategoryFailure: false,
  deleteCategorySuccess: false,
  deleteCategoryFailure: false,
};

export default function categoryReducer(state = initialState, action: any) {

  switch (action.type) {
    case "GET_CATEGORY_SUCCESS": {
      return {
        ...state,
        getCategorySuccess: true,
        getCategoryList: action.payload.data.data,
        getCategoryFailure: false,
      };
    }
    case "GET_CATEGORY_FAILURE": {
      return {
        ...state,
        getCategoryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getCategorySuccess: false,
      };
    }
    case "RESET_GET_CATEGORY": {
      return {
        ...state,
        getCategorySuccess: false,
        getCategoryFailure: false,
        getCategoryList: [],
        errorMessage: null,
      };
    }

    case "CREATE_CATEGORY_SUCCESS": {
      return {
        ...state,
        createCategorySuccess: true,
        createCategoryData: action.payload.data.data,
        createCategoryFailure: false,
      };
    }
    case "CREATE_CATEGORY_FAILURE": {
      return {
        ...state,
        createCategoryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createCategorySuccess: false,
      };
    }
    case "RESET_CREATE_CATEGORY": {
      return {
        ...state,
        createCategorySuccess: false,
        createCategoryFailure: false,
        createCategoryData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_CATEGORY_SUCCESS": {
      return {
        ...state,
        updateCategorySuccess: true,
        updateCategoryData: action.payload.data.data,
        updateCategoryFailure: false,
      };
    }
    case "UPDATE_CATEGORY_FAILURE": {
      return {
        ...state,
        updateCategoryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateCategorySuccess: false,
      };
    }
    case "RESET_UPDATE_CATEGORY": {
      return {
        ...state,
        updateCategorySuccess: false,
        updateCategoryFailure: false,
        updateCategoryData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_CATEGORY_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteCategorySuccess: true,
    //     deleteCategoryFailure: false,
    //   };
    // }
    // case "DELETE_CATEGORY_FAILURE": {
    //   return {
    //     ...state,
    //     deleteCategoryFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteCategorySuccess: false,
    //   };
    // }
    // case "RESET_DELETE_CATEGORY": {
    //   return {
    //     ...state,
    //     deleteCategorySuccess: false,
    //     deleteCategoryFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
