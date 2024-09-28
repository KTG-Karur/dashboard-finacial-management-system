//Get Reducer Call--->
export const getDuePaymentRequest = (params?: any) => ({
  type: 'GET_DUE_PAYMENT_REQUEST',
  payload: params,
});

export const getDuePaymentSuccess = (data: any) => ({
  type: 'GET_DUE_PAYMENT_SUCCESS',
  payload: { data },
});

export const getDuePaymentFailure = (errorMessage: string) => ({
  type: 'GET_DUE_PAYMENT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetDuePayment = () => ({
  type: 'RESET_GET_DUE_PAYMENT',
});
//Get Reducer Call--->
export const getInvestorDuePaymentRequest = (params?: any) => ({
  type: 'GET_INVESTOR_DUE_PAYMENT_REQUEST',
  payload: params,
});

export const getInvestorDuePaymentSuccess = (data: any) => ({
  type: 'GET_INVESTOR_DUE_PAYMENT_SUCCESS',
  payload: { data },
});

export const getInvestorDuePaymentFailure = (errorMessage: string) => ({
  type: 'GET_INVESTOR_DUE_PAYMENT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetInvestorDuePayment = () => ({
  type: 'RESET_GET_INVESTOR_DUE_PAYMENT',
});
//Get Reducer Call--->
export const getInvestorDuePaymentDetailsRequest = (params?: any) => ({
  type: 'GET_INVESTOR_DUE_PAYMENT_DETAILS_REQUEST',
  payload: params,
});

export const getInvestorDuePaymentDetailsSuccess = (data: any) => ({
  type: 'GET_INVESTOR_DUE_PAYMENT_DETAILS_SUCCESS',
  payload: { data },
});

export const getInvestorDuePaymentDetailsFailure = (errorMessage: string) => ({
  type: 'GET_INVESTOR_DUE_PAYMENT_DETAILS_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetInvestorDuePaymentDetails = () => ({
  type: 'RESET_GET_INVESTOR_DUE_PAYMENT_DETAILS',
});

//Get Reducer Call--->
export const getDuePaymentDetailsRequest = (params?: any) => ({
  type: 'GET_DUE_PAYMENT_DETAILS_REQUEST',
  payload: params,
});

export const getDuePaymentDetailsSuccess = (data: any) => ({
  type: 'GET_DUE_PAYMENT_DETAILS_SUCCESS',
  payload: { data },
});

export const getDuePaymentDetailsFailure = (errorMessage: string) => ({
  type: 'GET_DUE_PAYMENT_DETAILS_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetDueDetailsPayment = () => ({
  type: 'RESET_GET_DUE_PAYMENT_DETAILS',
});

//Create Reducer Call--->
export const createDuePaymentRequest = (data: any) => ({
  type: 'CREATE_DUE_PAYMENT_REQUEST',
  payload: data,
});

export const createDuePaymentSuccess = (data: any) => ({
  type: 'CREATE_DUE_PAYMENT_SUCCESS',
  payload: { data },
});

export const createDuePaymentFailure = (errorMessage: string) => ({
  type: 'CREATE_DUE_PAYMENT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateDuePayment = () => ({
  type: 'RESET_CREATE_DUE_PAYMENT',
});

//Update Reducer Call--->
export const updateDuePaymentRequest = ( data: any, id: string) => ({
  type: 'UPDATE_DUE_PAYMENT_REQUEST',
  payload: { data, id },
});

export const updateDuePaymentSuccess = (data: any) => ({
  type: 'UPDATE_DUE_PAYMENT_SUCCESS',
  payload: { data },
});

export const updateDuePaymentFailure = (errorMessage: string) => ({
  type: 'UPDATE_DUE_PAYMENT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateDuePayment = () => ({
  type: 'RESET_UPDATE_DUE_PAYMENT',
});
//Delete Reducer Call--->
// export const deleteDuePaymentRequest = ( id: string) => ({
//   type: 'DELETE_DUE_PAYMENT_REQUEST',
//   payload: { id },
// });

// export const deleteDuePaymentSuccess = (data: any) => ({
//   type: 'DELETE_DUE_PAYMENT_SUCCESS',
//   payload: { data },
// });

// export const deleteDuePaymentFailure = (errorMessage: string) => ({
//   type: 'DELETE_DUE_PAYMENT_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateDuePayment = () => ({
//   type: 'RESET_DELETE_DUE_PAYMENT',
// });
