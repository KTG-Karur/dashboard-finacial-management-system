// employee/reducers.ts
const initialState = {
  getStateList: [],
  createStateData: null,
  updateStateData: null,
  isLoading: false,
  error: null,
  getStateSuccess: false,
  getStateFailure: false,
  createStateSuccess: false,
  createStateFailure: false,
  updateStateSuccess: false,
  updateStateFailure: false,
  deleteStateSuccess: false,
  deleteStateFailure: false,
};

export default function stateReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_STATE_SUCCESS": {
      return {
        ...state,
        getStateSuccess: true,
        getStateList: action.payload.data.data,
        getStateFailure: false,
      };
    }
    case "GET_STATE_FAILURE": {
      return {
        ...state,
        getStateFailure: true,
        errorMessage: action.errorMessage,
        getStateSuccess: false,
      };
    }
    case "RESET_GET_STATE": {
      return {
        ...state,
        getStateSuccess: false,
        getStateFailure: false,
        getStateList: [],
        errorMessage: null,
      };
    }

    case "CREATE_STATE_SUCCESS": {
      return {
        ...state,
        createStateSuccess: true,
        createStateData: action.payload.data.data,
        createStateFailure: false,
      };
    }
    case "CREATE_STATE_FAILURE": {
      return {
        ...state,
        createStateFailure: true,
        errorMessage: action.errorMessage,
        createStateSuccess: false,
      };
    }
    case "RESET_CREATE_STATE": {
      return {
        ...state,
        createStateSuccess: false,
        createStateFailure: false,
        createStateData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_STATE_SUCCESS": {
      return {
        ...state,
        updateStateSuccess: true,
        updateStateData: action.payload.data.data,
        updateStateFailure: false,
      };
    }
    case "UPDATE_STATE_FAILURE": {
      return {
        ...state,
        updateStateFailure: true,
        errorMessage: action.errorMessage,
        updateStateSuccess: false,
      };
    }
    case "RESET_UPDATE_STATE": {
      return {
        ...state,
        updateStateSuccess: false,
        updateStateFailure: false,
        updateStateData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_STATE_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteStateSuccess: true,
    //     deleteStateFailure: false,
    //   };
    // }
    // case "DELETE_STATE_FAILURE": {
    //   return {
    //     ...state,
    //     deleteStateFailure: true,
    //     errorMessage: action.errorMessage,
    //     deleteStateSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_STATE": {
    //   return {
    //     ...state,
    //     deleteStateSuccess: false,
    //     deleteStateFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
