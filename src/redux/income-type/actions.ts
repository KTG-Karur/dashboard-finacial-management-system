//Get Reducer Call--->
export const getIncomeTypeRequest = (params?: any) => ({
  type: 'GET_INCOME_TYPE_REQUEST',
  payload: params,
});

export const getIncomeTypeSuccess = (data: any) => ({
  type: 'GET_INCOME_TYPE_SUCCESS',
  payload: { data },
});

export const getIncomeTypeFailure = (errorMessage: string) => ({
  type: 'GET_INCOME_TYPE_FAILURE',
  errorMessage,
});

export const resetGetIncomeType = () => ({
  type: 'RESET_GET_INCOME_TYPE',
});

//Create Reducer Call--->
export const createIncomeTypeRequest = (data: any) => ({
  type: 'CREATE_INCOME_TYPE_REQUEST',
  payload: data,
});

export const createIncomeTypeSuccess = (data: any) => ({
  type: 'CREATE_INCOME_TYPE_SUCCESS',
  payload: { data },
});

export const createIncomeTypeFailure = (errorMessage: string) => ({
  type: 'CREATE_INCOME_TYPE_FAILURE',
  errorMessage,
});

export const resetCreateIncomeType = () => ({
  type: 'RESET_CREATE_INCOME_TYPE',
});

//Update Reducer Call--->
export const updateIncomeTypeRequest = ( data: any, id: string) => ({
  type: 'UPDATE_INCOME_TYPE_REQUEST',
  payload: { data, id },
});

export const updateIncomeTypeSuccess = (data: any) => ({
  type: 'UPDATE_INCOME_TYPE_SUCCESS',
  payload: { data },
});

export const updateIncomeTypeFailure = (errorMessage: string) => ({
  type: 'UPDATE_INCOME_TYPE_FAILURE',
  errorMessage,
});

export const resetUpdateIncomeType = () => ({
  type: 'RESET_UPDATE_INCOME_TYPE',
});
//Delete Reducer Call--->
// export const deleteIncomeTypeRequest = ( id: string) => ({
//   type: 'DELETE_INCOME_TYPE_REQUEST',
//   payload: { id },
// });

// export const deleteIncomeTypeSuccess = (data: any) => ({
//   type: 'DELETE_INCOME_TYPE_SUCCESS',
//   payload: { data },
// });

// export const deleteIncomeTypeFailure = (errorMessage: string) => ({
//   type: 'DELETE_INCOME_TYPE_FAILURE',
//   errorMessage,
// });

// export const deleteUpdateIncomeType = () => ({
//   type: 'RESET_DELETE_INCOME_TYPE',
// });
