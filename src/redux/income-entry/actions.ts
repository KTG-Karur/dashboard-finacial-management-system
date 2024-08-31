//Get Reducer Call--->
export const getIncomeEntryRequest = (params?: any) => ({
  type: 'GET_INCOME_ENTRY_REQUEST',
  payload: params,
});

export const getIncomeEntrySuccess = (data: any) => ({
  type: 'GET_INCOME_ENTRY_SUCCESS',
  payload: { data },
});

export const getIncomeEntryFailure = (errorMessage: string) => ({
  type: 'GET_INCOME_ENTRY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetIncomeEntry = () => ({
  type: 'RESET_GET_INCOME_ENTRY',
});

//Create Reducer Call--->
export const createIncomeEntryRequest = (data: any) => ({
  type: 'CREATE_INCOME_ENTRY_REQUEST',
  payload: data,
});

export const createIncomeEntrySuccess = (data: any) => ({
  type: 'CREATE_INCOME_ENTRY_SUCCESS',
  payload: { data },
});

export const createIncomeEntryFailure = (errorMessage: string) => ({
  type: 'CREATE_INCOME_ENTRY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateIncomeEntry = () => ({
  type: 'RESET_CREATE_INCOME_ENTRY',
});

//Update Reducer Call--->
export const updateIncomeEntryRequest = ( data: any, id: string) => ({
  type: 'UPDATE_INCOME_ENTRY_REQUEST',
  payload: { data, id },
});

export const updateIncomeEntrySuccess = (data: any) => ({
  type: 'UPDATE_INCOME_ENTRY_SUCCESS',
  payload: { data },
});

export const updateIncomeEntryFailure = (errorMessage: string) => ({
  type: 'UPDATE_INCOME_ENTRY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateIncomeEntry = () => ({
  type: 'RESET_UPDATE_INCOME_ENTRY',
});
//Delete Reducer Call--->
// export const deleteIncomeEntryRequest = ( id: string) => ({
//   type: 'DELETE_INCOME_ENTRY_REQUEST',
//   payload: { id },
// });

// export const deleteIncomeEntrySuccess = (data: any) => ({
//   type: 'DELETE_INCOME_ENTRY_SUCCESS',
//   payload: { data },
// });

// export const deleteIncomeEntryFailure = (errorMessage: string) => ({
//   type: 'DELETE_INCOME_ENTRY_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateIncomeEntry = () => ({
//   type: 'RESET_DELETE_INCOME_ENTRY',
// });
