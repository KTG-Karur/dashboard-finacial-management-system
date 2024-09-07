//Get Reducer Call--->
export const getAddLoanRequest = (params?: any) => ({
  type: 'GET_ADDLOAN_REQUEST',
  payload: params,
});

export const getAddLoanSuccess = (data: any) => ({
  type: 'GET_ADDLOAN_SUCCESS',
  payload: { data },
});

export const getAddLoanFailure = (errorMessage: string) => ({
  type: 'GET_ADDLOAN_FAILURE',
  errorMessage: { errorMessage },
});

export const getAddLoanDetailsRequest = (params?: any) => ({
  type: 'GET_ADDLOAN_DETAILS_REQUEST',
  payload: params,
});

export const getAddLoanDetailsSuccess = (data: any) => ({
  type: 'GET_ADDLOAN_DETAILS_SUCCESS',
  payload: { data },
});

export const getAddLoanDetailsFailure = (errorMessage: string) => ({
  type: 'GET_ADDLOAN_DETAILS_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetAddLoan = () => ({
  type: 'RESET_GET_ADDLOAN',
});

export const resetGetAddLoanDetails = () => ({
  type: 'RESET_GET_ADDLOAN_DETAILS',
});

//Create Reducer Call--->
export const createAddLoanRequest = (data: any) => ({
  type: 'CREATE_ADDLOAN_REQUEST',
  payload: data,
});

export const createAddLoanSuccess = (data: any) => ({
  type: 'CREATE_ADDLOAN_SUCCESS',
  payload: { data },
});

export const createAddLoanFailure = (errorMessage: string) => ({
  type: 'CREATE_ADDLOAN_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateAddLoan = () => ({
  type: 'RESET_CREATE_ADDLOAN',
});

//Update Reducer Call--->
export const updateAddLoanRequest = ( data: any, id: string) => ({
  type: 'UPDATE_ADDLOAN_REQUEST',
  payload: { data, id },
});

export const updateAddLoanSuccess = (data: any) => ({
  type: 'UPDATE_ADDLOAN_SUCCESS',
  payload: { data },
});

export const updateAddLoanFailure = (errorMessage: string) => ({
  type: 'UPDATE_ADDLOAN_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateAddLoan = () => ({
  type: 'RESET_UPDATE_ADDLOAN',
});
//Delete Reducer Call--->
// export const deleteAddLoanRequest = ( id: string) => ({
//   type: 'DELETE_ADDLOAN_REQUEST',
//   payload: { id },
// });

// export const deleteAddLoanSuccess = (data: any) => ({
//   type: 'DELETE_ADDLOAN_SUCCESS',
//   payload: { data },
// });

// export const deleteAddLoanFailure = (errorMessage: string) => ({
//   type: 'DELETE_ADDLOAN_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateAddLoan = () => ({
//   type: 'RESET_DELETE_ADDLOAN',
// });
