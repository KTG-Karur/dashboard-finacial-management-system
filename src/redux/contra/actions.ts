//Get Reducer Call--->
export const getContraRequest = (params?: any) => ({
  type: 'GET_CONTRA_REQUEST',
  payload: params,
});

export const getContraSuccess = (data: any) => ({
  type: 'GET_CONTRA_SUCCESS',
  payload: { data },
});

export const getContraFailure = (errorMessage: string) => ({
  type: 'GET_CONTRA_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetContra = () => ({
  type: 'RESET_GET_CONTRA',
});
//Get Reducer Call--->
export const getContraDetailsRequest = (params?: any) => ({
  type: 'GET_CONTRA_DETAILS_REQUEST',
  payload: params,
});

export const getContraDetailsSuccess = (data: any) => ({
  type: 'GET_CONTRA_DETAILS_SUCCESS',
  payload: { data },
});

export const getContraDetailsFailure = (errorMessage: string) => ({
  type: 'GET_CONTRA_DETAILS_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetContraDetails = () => ({
  type: 'RESET_GET_CONTRA_DETAILS',
});

//Create Reducer Call--->
export const createContraRequest = (data: any) => ({
  type: 'CREATE_CONTRA_REQUEST',
  payload: data,
});

export const createContraSuccess = (data: any) => ({
  type: 'CREATE_CONTRA_SUCCESS',
  payload: { data },
});

export const createContraFailure = (errorMessage: string) => ({
  type: 'CREATE_CONTRA_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateContra = () => ({
  type: 'RESET_CREATE_CONTRA',
});

//Update Reducer Call--->
export const updateContraRequest = ( data: any, id: string) => ({
  type: 'UPDATE_CONTRA_REQUEST',
  payload: { data, id },
});

export const updateContraSuccess = (data: any) => ({
  type: 'UPDATE_CONTRA_SUCCESS',
  payload: { data },
});

export const updateContraFailure = (errorMessage: string) => ({
  type: 'UPDATE_CONTRA_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateContra = () => ({
  type: 'RESET_UPDATE_CONTRA',
});
//Delete Reducer Call--->
export const deleteContraRequest = ( id: string) => ({
  type: 'DELETE_CONTRA_REQUEST',
  payload: { id },
});

export const deleteContraSuccess = (data: any) => ({
  type: 'DELETE_CONTRA_SUCCESS',
  payload: { data },
});

export const deleteContraFailure = (errorMessage: string) => ({
  type: 'DELETE_CONTRA_FAILURE',
  errorMessage: { errorMessage },
});

export const deleteUpdateContra = () => ({
  type: 'RESET_DELETE_CONTRA',
});
