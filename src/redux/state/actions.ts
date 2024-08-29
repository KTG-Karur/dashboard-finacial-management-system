//Get Reducer Call--->
export const getStateRequest = (params?: any) => ({
  type: 'GET_STATE_REQUEST',
  payload: params,
});

export const getStateSuccess = (data: any) => ({
  type: 'GET_STATE_SUCCESS',
  payload: { data },
});

export const getStateFailure = (errorMessage: string) => ({
  type: 'GET_STATE_FAILURE',
  errorMessage,
});

export const resetGetState = () => ({
  type: 'RESET_GET_STATE',
});

//Create Reducer Call--->
export const createStateRequest = (data: any) => ({
  type: 'CREATE_STATE_REQUEST',
  payload: data,
});

export const createStateSuccess = (data: any) => ({
  type: 'CREATE_STATE_SUCCESS',
  payload: { data },
});

export const createStateFailure = (errorMessage: string) => ({
  type: 'CREATE_STATE_FAILURE',
  errorMessage,
});

export const resetCreateState = () => ({
  type: 'RESET_CREATE_STATE',
});

//Update Reducer Call--->
export const updateStateRequest = ( data: any, id: string) => ({
  type: 'UPDATE_STATE_REQUEST',
  payload: { data, id },
});

export const updateStateSuccess = (data: any) => ({
  type: 'UPDATE_STATE_SUCCESS',
  payload: { data },
});

export const updateStateFailure = (errorMessage: string) => ({
  type: 'UPDATE_STATE_FAILURE',
  errorMessage,
});

export const resetUpdateState = () => ({
  type: 'RESET_UPDATE_STATE',
});
//Delete Reducer Call--->
// export const deleteStateRequest = ( id: string) => ({
//   type: 'DELETE_STATE_REQUEST',
//   payload: { id },
// });

// export const deleteStateSuccess = (data: any) => ({
//   type: 'DELETE_STATE_SUCCESS',
//   payload: { data },
// });

// export const deleteStateFailure = (errorMessage: string) => ({
//   type: 'DELETE_STATE_FAILURE',
//   errorMessage,
// });

// export const deleteUpdateState = () => ({
//   type: 'RESET_DELETE_STATE',
// });
