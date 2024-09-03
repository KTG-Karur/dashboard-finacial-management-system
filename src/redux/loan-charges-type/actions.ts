//Get Reducer Call--->
export const getLoanChargesTypeRequest = (params?: any) => ({
  type: 'GET_LOAN_CHARGES_TYPE_REQUEST',
  payload: params,
});

export const getLoanChargesTypeSuccess = (data: any) => ({
  type: 'GET_LOAN_CHARGES_TYPE_SUCCESS',
  payload: { data },
});

export const getLoanChargesTypeFailure = (errorMessage: string) => ({
  type: 'GET_LOAN_CHARGES_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetLoanChargesType = () => ({
  type: 'RESET_GET_LOAN_CHARGES_TYPE',
});

//Create Reducer Call--->
export const createLoanChargesTypeRequest = (data: any) => ({
  type: 'CREATE_LOAN_CHARGES_TYPE_REQUEST',
  payload: data,
});

export const createLoanChargesTypeSuccess = (data: any) => ({
  type: 'CREATE_LOAN_CHARGES_TYPE_SUCCESS',
  payload: { data },
});

export const createLoanChargesTypeFailure = (errorMessage: string) => ({
  type: 'CREATE_LOAN_CHARGES_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateLoanChargesType = () => ({
  type: 'RESET_CREATE_LOAN_CHARGES_TYPE',
});

//Update Reducer Call--->
export const updateLoanChargesTypeRequest = ( data: any, id: string) => ({
  type: 'UPDATE_LOAN_CHARGES_TYPE_REQUEST',
  payload: { data, id },
});

export const updateLoanChargesTypeSuccess = (data: any) => ({
  type: 'UPDATE_LOAN_CHARGES_TYPE_SUCCESS',
  payload: { data },
});

export const updateLoanChargesTypeFailure = (errorMessage: string) => ({
  type: 'UPDATE_LOAN_CHARGES_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateLoanChargesType = () => ({
  type: 'RESET_UPDATE_LOAN_CHARGES_TYPE',
});
//Delete Reducer Call--->
// export const deleteLoanChargesTypeRequest = ( id: string) => ({
//   type: 'DELETE_LOAN_CHARGES_TYPE_REQUEST',
//   payload: { id },
// });

// export const deleteLoanChargesTypeSuccess = (data: any) => ({
//   type: 'DELETE_LOAN_CHARGES_TYPE_SUCCESS',
//   payload: { data },
// });

// export const deleteLoanChargesTypeFailure = (errorMessage: string) => ({
//   type: 'DELETE_LOAN_CHARGES_TYPE_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateLoanChargesType = () => ({
//   type: 'RESET_DELETE_LOAN_CHARGES_TYPE',
// });
