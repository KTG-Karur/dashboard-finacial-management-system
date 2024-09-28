// employee/reducers.ts
const initialState = {
  getLedgerCustomerList: [],
  getLedgerEmployeeList: [],
  isLoading: false,
  errorMessage: null,
  getLedgerCustomerSuccess: false,
  getLedgerCustomerFailure: false,
  getLedgerEmployeeSuccess: false,
  getLedgerEmployeeFailure: false,
};

export default function ledgerReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_LEDGER_EMPLOYEE_SUCCESS": {
      return {
        ...state,
        getLedgerEmployeeSuccess: true,
        getLedgerEmployeeList: action.payload.data.data,
        getLedgerEmployeeFailure: false,
      };
    }
    case "GET_LEDGER_EMPLOYEE_FAILURE": {
      return {
        ...state,
        getLedgerEmployeeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getLedgerEmployeeSuccess: false,
      };
    }
    case "RESET_GET_LEDGER_EMPLOYEE": {
      return {
        ...state,
        getLedgerEmployeeSuccess: false,
        getLedgerEmployeeFailure: false,
        getLedgerEmployeeList: [],
        errorMessage: null,
      };
    }

    case "GET_LEDGER_DETAILS_SUCCESS": {
      return {
        ...state,
        getLedgerDetailsSuccess: true,
        getLedgerDetailsList: action.payload.data.data,
        getLedgerDetailsFailure: false,
      };
    }
    case "GET_LEDGER_DETAILS_FAILURE": {
      return {
        ...state,
        getLedgerDetailsFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getLedgerDetailsSuccess: false,
      };
    }
    case "RESET_GET_LEDGER_DETAILS": {
      return {
        ...state,
        getLedgerDetailsSuccess: false,
        getLedgerDetailsFailure: false,
        getLedgerDetailsList: [],
        errorMessage: null,
      };
    }

    case "GET_LEDGER_CUSTOMER_SUCCESS": {
      return {
        ...state,
        getLedgerCustomerSuccess: true,
        getLedgerCustomerList: action.payload.data.data,
        getLedgerCustomerFailure: false,
      };
    }
    case "GET_LEDGER_CUSTOMER_FAILURE": {
      return {
        ...state,
        getLedgerCustomerFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getLedgerCustomerSuccess: false,
      };
    }
    case "RESET_GET_LEDGER_CUSTOMER": {
      return {
        ...state,
        getLedgerCustomerSuccess: false,
        getLedgerCustomerFailure: false,
        getLedgerCustomerList: [],
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
