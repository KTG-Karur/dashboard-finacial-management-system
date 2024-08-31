//Get Reducer Call--->
export const getExpenseEntryRequest = (params?: any) => ({
  type: 'GET_EXPENSE_ENTRY_REQUEST',
  payload: params,
});

export const getExpenseEntrySuccess = (data: any) => ({
  type: 'GET_EXPENSE_ENTRY_SUCCESS',
  payload: { data },
});

export const getExpenseEntryFailure = (errorMessage: string) => ({
  type: 'GET_EXPENSE_ENTRY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetExpenseEntry = () => ({
  type: 'RESET_GET_EXPENSE_ENTRY',
});

//Create Reducer Call--->
export const createExpenseEntryRequest = (data: any) => ({
  type: 'CREATE_EXPENSE_ENTRY_REQUEST',
  payload: data,
});

export const createExpenseEntrySuccess = (data: any) => ({
  type: 'CREATE_EXPENSE_ENTRY_SUCCESS',
  payload: { data },
});

export const createExpenseEntryFailure = (errorMessage: string) => ({
  type: 'CREATE_EXPENSE_ENTRY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateExpenseEntry = () => ({
  type: 'RESET_CREATE_EXPENSE_ENTRY',
});

//Update Reducer Call--->
export const updateExpenseEntryRequest = ( data: any, id: string) => ({
  type: 'UPDATE_EXPENSE_ENTRY_REQUEST',
  payload: { data, id },
});

export const updateExpenseEntrySuccess = (data: any) => ({
  type: 'UPDATE_EXPENSE_ENTRY_SUCCESS',
  payload: { data },
});

export const updateExpenseEntryFailure = (errorMessage: string) => ({
  type: 'UPDATE_EXPENSE_ENTRY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateExpenseEntry = () => ({
  type: 'RESET_UPDATE_EXPENSE_ENTRY',
});
//Delete Reducer Call--->
// export const deleteExpenseEntryRequest = ( id: string) => ({
//   type: 'DELETE_EXPENSE_ENTRY_REQUEST',
//   payload: { id },
// });

// export const deleteExpenseEntrySuccess = (data: any) => ({
//   type: 'DELETE_EXPENSE_ENTRY_SUCCESS',
//   payload: { data },
// });

// export const deleteExpenseEntryFailure = (errorMessage: string) => ({
//   type: 'DELETE_EXPENSE_ENTRY_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateExpenseEntry = () => ({
//   type: 'RESET_DELETE_EXPENSE_ENTRY',
// });
