// employee/reducers.ts
const initialState = {
  getCountryList: [],
  createCountryData: null,
  updateCountryData: null,
  isLoading: false,
  error: null,
  getCountrySuccess: false,
  getCountryFailure: false,
  createCountrySuccess: false,
  createCountryFailure: false,
  updateCountrySuccess: false,
  updateCountryFailure: false,
  deleteCountrySuccess: false,
  deleteCountryFailure: false,
};

export default function countryReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_COUNTRY_SUCCESS": {
      return {
        ...state,
        getCountrySuccess: true,
        getCountryList: action.payload.data.data,
        getCountryFailure: false,
      };
    }
    case "GET_COUNTRY_FAILURE": {
      return {
        ...state,
        getCountryFailure: true,
        errorMessage: action.errorMessage,
        getCountrySuccess: false,
      };
    }
    case "RESET_GET_COUNTRY": {
      return {
        ...state,
        getCountrySuccess: false,
        getCountryFailure: false,
        getCountryList: [],
        errorMessage: null,
      };
    }

    case "CREATE_COUNTRY_SUCCESS": {
      return {
        ...state,
        createCountrySuccess: true,
        createCountryData: action.payload.data.data,
        createCountryFailure: false,
      };
    }
    case "CREATE_COUNTRY_FAILURE": {
      return {
        ...state,
        createCountryFailure: true,
        errorMessage: action.errorMessage,
        createCountrySuccess: false,
      };
    }
    case "RESET_CREATE_COUNTRY": {
      return {
        ...state,
        createCountrySuccess: false,
        createCountryFailure: false,
        createCountryData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_COUNTRY_SUCCESS": {
      return {
        ...state,
        updateCountrySuccess: true,
        updateCountryData: action.payload.data.data,
        updateCountryFailure: false,
      };
    }
    case "UPDATE_COUNTRY_FAILURE": {
      return {
        ...state,
        updateCountryFailure: true,
        errorMessage: action.errorMessage,
        updateCountrySuccess: false,
      };
    }
    case "RESET_UPDATE_COUNTRY": {
      return {
        ...state,
        updateCountrySuccess: false,
        updateCountryFailure: false,
        updateCountryData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_COUNTRY_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteCountrySuccess: true,
    //     deleteCountryFailure: false,
    //   };
    // }
    // case "DELETE_COUNTRY_FAILURE": {
    //   return {
    //     ...state,
    //     deleteCountryFailure: true,
    //     errorMessage: action.errorMessage,
    //     deleteCountrySuccess: false,
    //   };
    // }
    // case "RESET_DELETE_COUNTRY": {
    //   return {
    //     ...state,
    //     deleteCountrySuccess: false,
    //     deleteCountryFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
