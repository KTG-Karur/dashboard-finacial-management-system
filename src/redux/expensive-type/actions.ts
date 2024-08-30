//Get Reducer Call--->
export const getExpensiveTypeRequest = (params?: any) => ({
  type: 'GET_EXPENSIVE_TYPE_REQUEST',
  payload: params,
});

export const getExpensiveTypeSuccess = (data: any) => ({
  type: 'GET_EXPENSIVE_TYPE_SUCCESS',
  payload: { data },
});

export const getExpensiveTypeFailure = (errorMessage: string) => ({
  type: 'GET_EXPENSIVE_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetExpensiveType = () => ({
  type: 'RESET_GET_EXPENSIVE_TYPE',
});

//Create Reducer Call--->
export const createExpensiveTypeRequest = (data: any) => ({
  type: 'CREATE_EXPENSIVE_TYPE_REQUEST',
  payload: data,
});

export const createExpensiveTypeSuccess = (data: any) => ({
  type: 'CREATE_EXPENSIVE_TYPE_SUCCESS',
  payload: { data },
});

export const createExpensiveTypeFailure = (errorMessage: string) => ({
  type: 'CREATE_EXPENSIVE_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateExpensiveType = () => ({
  type: 'RESET_CREATE_EXPENSIVE_TYPE',
});

//Update Reducer Call--->
export const updateExpensiveTypeRequest = ( data: any, id: string) => ({
  type: 'UPDATE_EXPENSIVE_TYPE_REQUEST',
  payload: { data, id },
});

export const updateExpensiveTypeSuccess = (data: any) => ({
  type: 'UPDATE_EXPENSIVE_TYPE_SUCCESS',
  payload: { data },
});

export const updateExpensiveTypeFailure = (errorMessage: string) => ({
  type: 'UPDATE_EXPENSIVE_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateExpensiveType = () => ({
  type: 'RESET_UPDATE_EXPENSIVE_TYPE',
});
//Delete Reducer Call--->
// export const deleteExpensiveTypeRequest = ( id: string) => ({
//   type: 'DELETE_EXPENSIVE_TYPE_REQUEST',
//   payload: { id },
// });

// export const deleteExpensiveTypeSuccess = (data: any) => ({
//   type: 'DELETE_EXPENSIVE_TYPE_SUCCESS',
//   payload: { data },
// });

// export const deleteExpensiveTypeFailure = (errorMessage: string) => ({
//   type: 'DELETE_EXPENSIVE_TYPE_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateExpensiveType = () => ({
//   type: 'RESET_DELETE_EXPENSIVE_TYPE',
// });
