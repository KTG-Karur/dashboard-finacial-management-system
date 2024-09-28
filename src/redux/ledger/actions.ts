//Get Reducer Call--->
export const getLedgerEmployeeRequest = (params?: any) => ({
  type: 'GET_LEDGER_EMPLOYEE_REQUEST',
  payload: params,
});

export const getLedgerEmployeeSuccess = (data: any) => ({
  type: 'GET_LEDGER_EMPLOYEE_SUCCESS',
  payload: { data },
});

export const getLedgerEmployeeFailure = (errorMessage: string) => ({
  type: 'GET_LEDGER_EMPLOYEE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetLedgerEmployee = () => ({
  type: 'RESET_GET_LEDGER_EMPLOYEE',
});

//Get Reducer Call--->
export const getLedgerCustomerRequest = (params?: any) => ({
  type: 'GET_LEDGER_CUSTOMER_REQUEST',
  payload: params,
});

export const getLedgerCustomerSuccess = (data: any) => ({
  type: 'GET_LEDGER_CUSTOMER_SUCCESS',
  payload: { data },
});

export const getLedgerCustomerFailure = (errorMessage: string) => ({
  type: 'GET_LEDGER_CUSTOMER_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetLedgerCustomer = () => ({
  type: 'RESET_GET_LEDGER_CUSTOMER',
});

//Get Reducer Call--->
export const getLedgerDetailsRequest = (params?: any) => ({
  type: 'GET_LEDGER_DETAILS_REQUEST',
  payload: params,
});

export const getLedgerDetailsSuccess = (data: any) => ({
  type: 'GET_LEDGER_DETAILS_SUCCESS',
  payload: { data },
});

export const getLedgerDetailsFailure = (errorMessage: string) => ({
  type: 'GET_LEDGER_DETAILS_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetLedgerDetails = () => ({
  type: 'RESET_GET_LEDGER_DETAILS',
});
