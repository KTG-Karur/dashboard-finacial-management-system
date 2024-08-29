// employee/reducers.ts
const initialState = {
  getDistrictList: [],
  createDistrictData: null,
  updateDistrictData: null,
  isLoading: false,
  error: null,
  getDistrictSuccess: false,
  getDistrictFailure: false,
  createDistrictSuccess: false,
  createDistrictFailure: false,
  updateDistrictSuccess: false,
  updateDistrictFailure: false,
  deleteDistrictSuccess: false,
  deleteDistrictFailure: false,
};

export default function districtReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_DISTRICT_SUCCESS": {
      return {
        ...state,
        getDistrictSuccess: true,
        getDistrictList: action.payload.data.data,
        getDistrictFailure: false,
      };
    }
    case "GET_DISTRICT_FAILURE": {
      return {
        ...state,
        getDistrictFailure: true,
        errorMessage: action.errorMessage,
        getDistrictSuccess: false,
      };
    }
    case "RESET_GET_DISTRICT": {
      return {
        ...state,
        getDistrictSuccess: false,
        getDistrictFailure: false,
        getDistrictList: [],
        errorMessage: null,
      };
    }

    case "CREATE_DISTRICT_SUCCESS": {
      return {
        ...state,
        createDistrictSuccess: true,
        createDistrictData: action.payload.data.data,
        createDistrictFailure: false,
      };
    }
    case "CREATE_DISTRICT_FAILURE": {
      return {
        ...state,
        createDistrictFailure: true,
        errorMessage: action.errorMessage,
        createDistrictSuccess: false,
      };
    }
    case "RESET_CREATE_DISTRICT": {
      return {
        ...state,
        createDistrictSuccess: false,
        createDistrictFailure: false,
        createDistrictData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_DISTRICT_SUCCESS": {
      return {
        ...state,
        updateDistrictSuccess: true,
        updateDistrictData: action.payload.data.data,
        updateDistrictFailure: false,
      };
    }
    case "UPDATE_DISTRICT_FAILURE": {
      return {
        ...state,
        updateDistrictFailure: true,
        errorMessage: action.errorMessage,
        updateDistrictSuccess: false,
      };
    }
    case "RESET_UPDATE_DISTRICT": {
      return {
        ...state,
        updateDistrictSuccess: false,
        updateDistrictFailure: false,
        updateDistrictData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_DISTRICT_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteDistrictSuccess: true,
    //     deleteDistrictFailure: false,
    //   };
    // }
    // case "DELETE_DISTRICT_FAILURE": {
    //   return {
    //     ...state,
    //     deleteDistrictFailure: true,
    //     errorMessage: action.errorMessage,
    //     deleteDistrictSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_DISTRICT": {
    //   return {
    //     ...state,
    //     deleteDistrictSuccess: false,
    //     deleteDistrictFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
