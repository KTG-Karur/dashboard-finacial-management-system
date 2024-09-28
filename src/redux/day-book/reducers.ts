// employee/reducers.ts
const initialState = {
  getDayBookList: [],
  createDayBookData: null,
  updateDayBookData: null,
  isLoading: false,
  errorMessage: null,
  getDayBookSuccess: false,
  getDayBookFailure: false,
  createDayBookSuccess: false,
  createDayBookFailure: false,
  updateDayBookSuccess: false,
  updateDayBookFailure: false,
  deleteDayBookSuccess: false,
  deleteDayBookFailure: false,
};

export default function dayBookReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_DAY_BOOK_SUCCESS": {
      return {
        ...state,
        getDayBookSuccess: true,
        getDayBookList: action.payload.data.data,
        getDayBookFailure: false,
      };
    }
    case "GET_DAY_BOOK_FAILURE": {
      return {
        ...state,
        getDayBookFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getDayBookSuccess: false,
      };
    }
    case "RESET_GET_DAY_BOOK": {
      return {
        ...state,
        getDayBookSuccess: false,
        getDayBookFailure: false,
        getDayBookList: [],
        errorMessage: null,
      };
    }

    case "CREATE_DAY_BOOK_SUCCESS": {
      return {
        ...state,
        createDayBookSuccess: true,
        createDayBookData: action.payload.data.data,
        createDayBookFailure: false,
      };
    }
    case "CREATE_DAY_BOOK_FAILURE": {
      return {
        ...state,
        createDayBookFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createDayBookSuccess: false,
      };
    }
    case "RESET_CREATE_DAY_BOOK": {
      return {
        ...state,
        createDayBookSuccess: false,
        createDayBookFailure: false,
        createDayBookData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_DAY_BOOK_SUCCESS": {
      return {
        ...state,
        updateDayBookSuccess: true,
        updateDayBookData: action.payload.data.data,
        updateDayBookFailure: false,
      };
    }
    case "UPDATE_DAY_BOOK_FAILURE": {
      return {
        ...state,
        updateDayBookFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateDayBookSuccess: false,
      };
    }
    case "RESET_UPDATE_DAY_BOOK": {
      return {
        ...state,
        updateDayBookSuccess: false,
        updateDayBookFailure: false,
        updateDayBookData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_DAY_BOOK_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteDayBookSuccess: true,
    //     deleteDayBookFailure: false,
    //   };
    // }
    // case "DELETE_DAY_BOOK_FAILURE": {
    //   return {
    //     ...state,
    //     deleteDayBookFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteDayBookSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_DAY_BOOK": {
    //   return {
    //     ...state,
    //     deleteDayBookSuccess: false,
    //     deleteDayBookFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
