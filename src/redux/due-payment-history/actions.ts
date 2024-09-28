//Get Reducer Call--->
export const getDuePaymentHistoryRequest = (params?: any) => ({
  type: 'GET_DUE_PAYMENT_HISTORY_REQUEST',
  payload: params,
});

export const getDuePaymentHistorySuccess = (data: any) => ({
  type: 'GET_DUE_PAYMENT_HISTORY_SUCCESS',
  payload: { data },
});

export const getDuePaymentHistoryFailure = (errorMessage: string) => ({
  type: 'GET_DUE_PAYMENT_HISTORY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetDuePaymentHistory = () => ({
  type: 'RESET_GET_DUE_PAYMENT_HISTORY',
});

//Create Reducer Call--->
export const createDuePaymentHistoryRequest = (data: any) => ({
  type: 'CREATE_DUE_PAYMENT_HISTORY_REQUEST',
  payload: data,
});

export const createDuePaymentHistorySuccess = (data: any) => ({
  type: 'CREATE_DUE_PAYMENT_HISTORY_SUCCESS',
  payload: { data },
});

export const createDuePaymentHistoryFailure = (errorMessage: string) => ({
  type: 'CREATE_DUE_PAYMENT_HISTORY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateDuePaymentHistory = () => ({
  type: 'RESET_CREATE_DUE_PAYMENT_HISTORY',
});

//Update Reducer Call--->
export const updateDuePaymentHistoryRequest = ( data: any, id: string) => ({
  type: 'UPDATE_DUE_PAYMENT_HISTORY_REQUEST',
  payload: { data, id },
});

export const updateDuePaymentHistorySuccess = (data: any) => ({
  type: 'UPDATE_DUE_PAYMENT_HISTORY_SUCCESS',
  payload: { data },
});

export const updateDuePaymentHistoryFailure = (errorMessage: string) => ({
  type: 'UPDATE_DUE_PAYMENT_HISTORY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateDuePaymentHistory = () => ({
  type: 'RESET_UPDATE_DUE_PAYMENT_HISTORY',
});
//Delete Reducer Call--->
// export const deleteDuePaymentHistoryRequest = ( id: string) => ({
//   type: 'DELETE_DUE_PAYMENT_HISTORY_REQUEST',
//   payload: { id },
// });

// export const deleteDuePaymentHistorySuccess = (data: any) => ({
//   type: 'DELETE_DUE_PAYMENT_HISTORY_SUCCESS',
//   payload: { data },
// });

// export const deleteDuePaymentHistoryFailure = (errorMessage: string) => ({
//   type: 'DELETE_DUE_PAYMENT_HISTORY_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateDuePaymentHistory = () => ({
//   type: 'RESET_DELETE_DUE_PAYMENT_HISTORY',
// });
