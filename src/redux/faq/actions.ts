//Get Reducer Call--->
export const getFaqRequest = (params?: any) => ({
  type: 'GET_FAQ_REQUEST',
  payload: params,
});

export const getFaqSuccess = (data: any) => ({
  type: 'GET_FAQ_SUCCESS',
  payload: { data },
});

export const getFaqFailure = (errorMessage: string) => ({
  type: 'GET_FAQ_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetFaq = () => ({
  type: 'RESET_GET_FAQ',
});

//Create Reducer Call--->
export const createFaqRequest = (data: any) => ({
  type: 'CREATE_FAQ_REQUEST',
  payload: data,
});

export const createFaqSuccess = (data: any) => ({
  type: 'CREATE_FAQ_SUCCESS',
  payload: { data },
});

export const createFaqFailure = (errorMessage: string) => ({
  type: 'CREATE_FAQ_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateFaq = () => ({
  type: 'RESET_CREATE_FAQ',
});

//Update Reducer Call--->
export const updateFaqRequest = ( data: any, id: string) => ({
  type: 'UPDATE_FAQ_REQUEST',
  payload: { data, id },
});

export const updateFaqSuccess = (data: any) => ({
  type: 'UPDATE_FAQ_SUCCESS',
  payload: { data },
});

export const updateFaqFailure = (errorMessage: string) => ({
  type: 'UPDATE_FAQ_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateFaq = () => ({
  type: 'RESET_UPDATE_FAQ',
});
//Delete Reducer Call--->
export const deleteFaqRequest = ( id: string) => ({
  type: 'DELETE_FAQ_REQUEST',
  payload: { id },
});

export const deleteFaqSuccess = (data: any) => ({
  type: 'DELETE_FAQ_SUCCESS',
  payload: { data },
});

export const deleteFaqFailure = (errorMessage: string) => ({
  type: 'DELETE_FAQ_FAILURE',
  errorMessage: { errorMessage },
});

export const resetDeleteFaq = () => ({
  type: 'RESET_DELETE_FAQ',
});
