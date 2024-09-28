//Get Reducer Call--->
export const getDayBookRequest = (params?: any) => ({
  type: 'GET_DAY_BOOK_REQUEST',
  payload: params,
});

export const getDayBookSuccess = (data: any) => ({
  type: 'GET_DAY_BOOK_SUCCESS',
  payload: { data },
});

export const getDayBookFailure = (errorMessage: string) => ({
  type: 'GET_DAY_BOOK_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetDayBook = () => ({
  type: 'RESET_GET_DAY_BOOK',
});

//Create Reducer Call--->
export const createDayBookRequest = (data: any) => ({
  type: 'CREATE_DAY_BOOK_REQUEST',
  payload: data,
});

export const createDayBookSuccess = (data: any) => ({
  type: 'CREATE_DAY_BOOK_SUCCESS',
  payload: { data },
});

export const createDayBookFailure = (errorMessage: string) => ({
  type: 'CREATE_DAY_BOOK_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateDayBook = () => ({
  type: 'RESET_CREATE_DAY_BOOK',
});

//Update Reducer Call--->
export const updateDayBookRequest = ( data: any, id: string) => ({
  type: 'UPDATE_DAY_BOOK_REQUEST',
  payload: { data, id },
});

export const updateDayBookSuccess = (data: any) => ({
  type: 'UPDATE_DAY_BOOK_SUCCESS',
  payload: { data },
});

export const updateDayBookFailure = (errorMessage: string) => ({
  type: 'UPDATE_DAY_BOOK_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateDayBook = () => ({
  type: 'RESET_UPDATE_DAY_BOOK',
});
//Delete Reducer Call--->
// export const deleteDayBookRequest = ( id: string) => ({
//   type: 'DELETE_DAY_BOOK_REQUEST',
//   payload: { id },
// });

// export const deleteDayBookSuccess = (data: any) => ({
//   type: 'DELETE_DAY_BOOK_SUCCESS',
//   payload: { data },
// });

// export const deleteDayBookFailure = (errorMessage: string) => ({
//   type: 'DELETE_DAY_BOOK_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateDayBook = () => ({
//   type: 'RESET_DELETE_DAY_BOOK',
// });
