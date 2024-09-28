//Get Reducer Call--->
export const getDayBookHistoryRequest = (params?: any) => ({
  type: 'GET_DAY_BOOK_HISTORY_REQUEST',
  payload: params,
});

export const getDayBookHistorySuccess = (data: any) => ({
  type: 'GET_DAY_BOOK_HISTORY_SUCCESS',
  payload: { data },
});

export const getDayBookHistoryFailure = (errorMessage: string) => ({
  type: 'GET_DAY_BOOK_HISTORY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetDayBookHistory = () => ({
  type: 'RESET_GET_DAY_BOOK_HISTORY',
});

//Create Reducer Call--->
export const createDayBookHistoryRequest = (data: any) => ({
  type: 'CREATE_DAY_BOOK_HISTORY_REQUEST',
  payload: data,
});

export const createDayBookHistorySuccess = (data: any) => ({
  type: 'CREATE_DAY_BOOK_HISTORY_SUCCESS',
  payload: { data },
});

export const createDayBookHistoryFailure = (errorMessage: string) => ({
  type: 'CREATE_DAY_BOOK_HISTORY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateDayBookHistory = () => ({
  type: 'RESET_CREATE_DAY_BOOK_HISTORY',
});

//Update Reducer Call--->
export const updateDayBookHistoryRequest = ( data: any, id: string) => ({
  type: 'UPDATE_DAY_BOOK_HISTORY_REQUEST',
  payload: { data, id },
});

export const updateDayBookHistorySuccess = (data: any) => ({
  type: 'UPDATE_DAY_BOOK_HISTORY_SUCCESS',
  payload: { data },
});

export const updateDayBookHistoryFailure = (errorMessage: string) => ({
  type: 'UPDATE_DAY_BOOK_HISTORY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateDayBookHistory = () => ({
  type: 'RESET_UPDATE_DAY_BOOK_HISTORY',
});
//Delete Reducer Call--->
// export const deleteDayBookHistoryRequest = ( id: string) => ({
//   type: 'DELETE_DAY_BOOK_HISTORY_REQUEST',
//   payload: { id },
// });

// export const deleteDayBookHistorySuccess = (data: any) => ({
//   type: 'DELETE_DAY_BOOK_HISTORY_SUCCESS',
//   payload: { data },
// });

// export const deleteDayBookHistoryFailure = (errorMessage: string) => ({
//   type: 'DELETE_DAY_BOOK_HISTORY_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateDayBookHistory = () => ({
//   type: 'RESET_DELETE_DAY_BOOK_HISTORY',
// });
