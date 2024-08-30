//Get Reducer Call--->
export const getDisbursedMethodRequest = (params?: any) => ({
  type: 'GET_DISBURSED_METHOD_REQUEST',
  payload: params,
});

export const getDisbursedMethodSuccess = (data: any) => ({
  type: 'GET_DISBURSED_METHOD_SUCCESS',
  payload: { data },
});

export const getDisbursedMethodFailure = (errorMessage: string) => ({
  type: 'GET_DISBURSED_METHOD_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetDisbursedMethod = () => ({
  type: 'RESET_GET_DISBURSED_METHOD',
});

//Create Reducer Call--->
export const createDisbursedMethodRequest = (data: any) => ({
  type: 'CREATE_DISBURSED_METHOD_REQUEST',
  payload: data,
});

export const createDisbursedMethodSuccess = (data: any) => ({
  type: 'CREATE_DISBURSED_METHOD_SUCCESS',
  payload: { data },
});

export const createDisbursedMethodFailure = (errorMessage: string) => ({
  type: 'CREATE_DISBURSED_METHOD_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateDisbursedMethod = () => ({
  type: 'RESET_CREATE_DISBURSED_METHOD',
});

//Update Reducer Call--->
export const updateDisbursedMethodRequest = ( data: any, id: string) => ({
  type: 'UPDATE_DISBURSED_METHOD_REQUEST',
  payload: { data, id },
});

export const updateDisbursedMethodSuccess = (data: any) => ({
  type: 'UPDATE_DISBURSED_METHOD_SUCCESS',
  payload: { data },
});

export const updateDisbursedMethodFailure = (errorMessage: string) => ({
  type: 'UPDATE_DISBURSED_METHOD_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateDisbursedMethod = () => ({
  type: 'RESET_UPDATE_DISBURSED_METHOD',
});
//Delete Reducer Call--->
// export const deleteDisbursedMethodRequest = ( id: string) => ({
//   type: 'DELETE_DISBURSED_METHOD_REQUEST',
//   payload: { id },
// });

// export const deleteDisbursedMethodSuccess = (data: any) => ({
//   type: 'DELETE_DISBURSED_METHOD_SUCCESS',
//   payload: { data },
// });

// export const deleteDisbursedMethodFailure = (errorMessage: string) => ({
//   type: 'DELETE_DISBURSED_METHOD_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateDisbursedMethod = () => ({
//   type: 'RESET_DELETE_DISBURSED_METHOD',
// });
