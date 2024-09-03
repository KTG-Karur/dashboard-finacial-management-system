//Get Reducer Call--->
export const getLoanChargesRequest = (params?: any) => ({
  type: 'GET_LOANCHARGES_REQUEST',
  payload: params,
});

export const getLoanChargesSuccess = (data: any) => ({
  type: 'GET_LOANCHARGES_SUCCESS',
  payload: { data },
});

export const getLoanChargesFailure = (errorMessage: string) => ({
  type: 'GET_LOANCHARGES_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetLoanCharges = () => ({
  type: 'RESET_GET_LOANCHARGES',
});

//Create Reducer Call--->
export const createLoanChargesRequest = (data: any) => ({
  type: 'CREATE_LOANCHARGES_REQUEST',
  payload: data,
});

export const createLoanChargesSuccess = (data: any) => ({
  type: 'CREATE_LOANCHARGES_SUCCESS',
  payload: { data },
});

export const createLoanChargesFailure = (errorMessage: string) => ({
  type: 'CREATE_LOANCHARGES_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateLoanCharges = () => ({
  type: 'RESET_CREATE_LOANCHARGES',
});

//Update Reducer Call--->
export const updateLoanChargesRequest = ( data: any, id: string) => ({
  type: 'UPDATE_LOANCHARGES_REQUEST',
  payload: { data, id },
});

export const updateLoanChargesSuccess = (data: any) => ({
  type: 'UPDATE_LOANCHARGES_SUCCESS',
  payload: { data },
});

export const updateLoanChargesFailure = (errorMessage: string) => ({
  type: 'UPDATE_LOANCHARGES_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateLoanCharges = () => ({
  type: 'RESET_UPDATE_LOANCHARGES',
});
//Delete Reducer Call--->
// export const deleteLoanChargesRequest = ( id: string) => ({
//   type: 'DELETE_LOANCHARGES_REQUEST',
//   payload: { id },
// });

// export const deleteLoanChargesSuccess = (data: any) => ({
//   type: 'DELETE_LOANCHARGES_SUCCESS',
//   payload: { data },
// });

// export const deleteLoanChargesFailure = (errorMessage: string) => ({
//   type: 'DELETE_LOANCHARGES_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateLoanCharges = () => ({
//   type: 'RESET_DELETE_LOANCHARGES',
// });
