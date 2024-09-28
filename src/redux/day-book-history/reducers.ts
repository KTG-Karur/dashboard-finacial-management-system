// employee/reducers.ts
const initialState = {
  getDayBookHistoryList: [],
  createDayBookHistoryData: null,
  updateDayBookHistoryData: null,
  isLoading: false,
  errorMessage: null,
  getDayBookHistorySuccess: false,
  getDayBookHistoryFailure: false,
  createDayBookHistorySuccess: false,
  createDayBookHistoryFailure: false,
  updateDayBookHistorySuccess: false,
  updateDayBookHistoryFailure: false,
  deleteDayBookHistorySuccess: false,
  deleteDayBookHistoryFailure: false,
};

export default function dayBookHistoryReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_DAY_BOOK_HISTORY_SUCCESS": {
      return {
        ...state,
        getDayBookHistorySuccess: true,
        getDayBookHistoryList: action.payload.data.data,
        getDayBookHistoryFailure: false,
      };
    }
    case "GET_DAY_BOOK_HISTORY_FAILURE": {
      return {
        ...state,
        getDayBookHistoryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getDayBookHistorySuccess: false,
      };
    }
    case "RESET_GET_DAY_BOOK_HISTORY": {
      return {
        ...state,
        getDayBookHistorySuccess: false,
        getDayBookHistoryFailure: false,
        getDayBookHistoryList: [],
        errorMessage: null,
      };
    }

    case "CREATE_DAY_BOOK_HISTORY_SUCCESS": {
      return {
        ...state,
        createDayBookHistorySuccess: true,
        createDayBookHistoryData: action.payload.data.data,
        createDayBookHistoryFailure: false,
      };
    }
    case "CREATE_DAY_BOOK_HISTORY_FAILURE": {
      return {
        ...state,
        createDayBookHistoryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createDayBookHistorySuccess: false,
      };
    }
    case "RESET_CREATE_DAY_BOOK_HISTORY": {
      return {
        ...state,
        createDayBookHistorySuccess: false,
        createDayBookHistoryFailure: false,
        createDayBookHistoryData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_DAY_BOOK_HISTORY_SUCCESS": {
      return {
        ...state,
        updateDayBookHistorySuccess: true,
        updateDayBookHistoryData: action.payload.data.data,
        updateDayBookHistoryFailure: false,
      };
    }
    case "UPDATE_DAY_BOOK_HISTORY_FAILURE": {
      return {
        ...state,
        updateDayBookHistoryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateDayBookHistorySuccess: false,
      };
    }
    case "RESET_UPDATE_DAY_BOOK_HISTORY": {
      return {
        ...state,
        updateDayBookHistorySuccess: false,
        updateDayBookHistoryFailure: false,
        updateDayBookHistoryData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_DAY_BOOK_HISTORY_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteDayBookHistorySuccess: true,
    //     deleteDayBookHistoryFailure: false,
    //   };
    // }
    // case "DELETE_DAY_BOOK_HISTORY_FAILURE": {
    //   return {
    //     ...state,
    //     deleteDayBookHistoryFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteDayBookHistorySuccess: false,
    //   };
    // }
    // case "RESET_DELETE_DAY_BOOK_HISTORY": {
    //   return {
    //     ...state,
    //     deleteDayBookHistorySuccess: false,
    //     deleteDayBookHistoryFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
