// employee/reducers.ts
const initialState = {
  getAddressTypeList: [],
  createAddressTypeData: null,
  updateAddressTypeData: null,
  isLoading: false,
  errorMessage: null,
  getAddressTypeSuccess: false,
  getAddressTypeFailure: false,
  createAddressTypeSuccess: false,
  createAddressTypeFailure: false,
  updateAddressTypeSuccess: false,
  updateAddressTypeFailure: false,
  deleteAddressTypeSuccess: false,
  deleteAddressTypeFailure: false,
};

export default function addressTypeReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_ADDRESS_TYPE_SUCCESS": {
      return {
        ...state,
        getAddressTypeSuccess: true,
        getAddressTypeList: action.payload.data.data,
        getAddressTypeFailure: false,
      };
    }
    case "GET_ADDRESS_TYPE_FAILURE": {
      return {
        ...state,
        getAddressTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getAddressTypeSuccess: false,
      };
    }
    case "RESET_GET_ADDRESS_TYPE": {
      return {
        ...state,
        getAddressTypeSuccess: false,
        getAddressTypeFailure: false,
        getAddressTypeList: [],
        errorMessage: null,
      };
    }

    case "CREATE_ADDRESS_TYPE_SUCCESS": {
      return {
        ...state,
        createAddressTypeSuccess: true,
        createAddressTypeData: action.payload.data.data,
        createAddressTypeFailure: false,
      };
    }
    case "CREATE_ADDRESS_TYPE_FAILURE": {
      return {
        ...state,
        createAddressTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createAddressTypeSuccess: false,
      };
    }
    case "RESET_CREATE_ADDRESS_TYPE": {
      return {
        ...state,
        createAddressTypeSuccess: false,
        createAddressTypeFailure: false,
        createAddressTypeData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_ADDRESS_TYPE_SUCCESS": {
      return {
        ...state,
        updateAddressTypeSuccess: true,
        updateAddressTypeData: action.payload.data.data,
        updateAddressTypeFailure: false,
      };
    }
    case "UPDATE_ADDRESS_TYPE_FAILURE": {
      return {
        ...state,
        updateAddressTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateAddressTypeSuccess: false,
      };
    }
    case "RESET_UPDATE_ADDRESS_TYPE": {
      return {
        ...state,
        updateAddressTypeSuccess: false,
        updateAddressTypeFailure: false,
        updateAddressTypeData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_ADDRESS_TYPE_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteAddressTypeSuccess: true,
    //     deleteAddressTypeFailure: false,
    //   };
    // }
    // case "DELETE_ADDRESS_TYPE_FAILURE": {
    //   return {
    //     ...state,
    //     deleteAddressTypeFailure: true,
    //     errorMessage: action.errorMessage,
    //     deleteAddressTypeSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_ADDRESS_TYPE": {
    //   return {
    //     ...state,
    //     deleteAddressTypeSuccess: false,
    //     deleteAddressTypeFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
