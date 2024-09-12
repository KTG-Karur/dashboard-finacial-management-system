// employee/reducers.ts
const initialState = {
  getInvestmentList: [],
  createInvestmentData: null,
  updateInvestmentData: null,
  isLoading: false,
  errorMessage: null,
  getInvestmentSuccess: false,
  getInvestmentFailure: false,
  createInvestmentSuccess: false,
  createInvestmentFailure: false,
  updateInvestmentSuccess: false,
  updateInvestmentFailure: false,
  deleteInvestmentSuccess: false,
  deleteInvestmentFailure: false,
};

export default function investmentReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_INVESTMENT_SUCCESS": {
      return {
        ...state,
        getInvestmentSuccess: true,
        getInvestmentList: action.payload.data.data,
        getInvestmentFailure: false,
      };
    }
    case "GET_INVESTMENT_FAILURE": {
      return {
        ...state,
        getInvestmentFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getInvestmentSuccess: false,
      };
    }
    case "RESET_GET_INVESTMENT": {
      return {
        ...state,
        getInvestmentSuccess: false,
        getInvestmentFailure: false,
        getInvestmentList: [],
        errorMessage: null,
      };
    }

    case "GET_INVESTMENT_DETAILS_SUCCESS": {
      return {
        ...state,
        getInvestmentDetailsSuccess: true,
        getInvestmentDetailsList: action.payload.data.data,
        getInvestmentDetailsFailure: false,
      };
    }
    case "GET_INVESTMENT_DETAILS_FAILURE": {
      return {
        ...state,
        getInvestmentDetailsFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getInvestmentDetailsSuccess: false,
      };
    }
    case "RESET_GET_INVESTMENT_DETAILS": {
      return {
        ...state,
        getInvestmentDetailsSuccess: false,
        getInvestmentDetailsFailure: false,
        getInvestmentDetailsList: [],
        errorMessage: null,
      };
    }

    case "CREATE_INVESTMENT_SUCCESS": {
      return {
        ...state,
        createInvestmentSuccess: true,
        createInvestmentData: action.payload.data.data,
        createInvestmentFailure: false,
      };
    }
    case "CREATE_INVESTMENT_FAILURE": {
      return {
        ...state,
        createInvestmentFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createInvestmentSuccess: false,
      };
    }
    case "RESET_CREATE_INVESTMENT": {
      return {
        ...state,
        createInvestmentSuccess: false,
        createInvestmentFailure: false,
        createInvestmentData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_INVESTMENT_SUCCESS": {
      return {
        ...state,
        updateInvestmentSuccess: true,
        updateInvestmentData: action.payload.data.data,
        updateInvestmentFailure: false,
      };
    }
    case "UPDATE_INVESTMENT_FAILURE": {
      return {
        ...state,
        updateInvestmentFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateInvestmentSuccess: false,
      };
    }
    case "RESET_UPDATE_INVESTMENT": {
      return {
        ...state,
        updateInvestmentSuccess: false,
        updateInvestmentFailure: false,
        updateInvestmentData: null,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
