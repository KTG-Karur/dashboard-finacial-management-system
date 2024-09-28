//Get Reducer Call--->
export const getEnquiryRequest = (params?: any) => ({
  type: 'GET_ENQUIRY_REQUEST',
  payload: params,
});

export const getEnquirySuccess = (data: any) => ({
  type: 'GET_ENQUIRY_SUCCESS',
  payload: { data },
});

export const getEnquiryFailure = (errorMessage: string) => ({
  type: 'GET_ENQUIRY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetEnquiry = () => ({
  type: 'RESET_GET_ENQUIRY',
});

//Create Reducer Call--->
export const createEnquiryRequest = (data: any) => ({
  type: 'CREATE_ENQUIRY_REQUEST',
  payload: data,
});

export const createEnquirySuccess = (data: any) => ({
  type: 'CREATE_ENQUIRY_SUCCESS',
  payload: { data },
});

export const createEnquiryFailure = (errorMessage: string) => ({
  type: 'CREATE_ENQUIRY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateEnquiry = () => ({
  type: 'RESET_CREATE_ENQUIRY',
});

//Update Reducer Call--->
export const updateEnquiryRequest = ( data: any, id: string) => ({
  type: 'UPDATE_ENQUIRY_REQUEST',
  payload: { data, id },
});

export const updateEnquirySuccess = (data: any) => ({
  type: 'UPDATE_ENQUIRY_SUCCESS',
  payload: { data },
});

export const updateEnquiryFailure = (errorMessage: string) => ({
  type: 'UPDATE_ENQUIRY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateEnquiry = () => ({
  type: 'RESET_UPDATE_ENQUIRY',
});
//Delete Reducer Call--->
export const deleteEnquiryRequest = ( id: string) => ({
  type: 'DELETE_ENQUIRY_REQUEST',
  payload: { id },
});

export const deleteEnquirySuccess = (data: any) => ({
  type: 'DELETE_ENQUIRY_SUCCESS',
  payload: { data },
});

export const deleteEnquiryFailure = (errorMessage: string) => ({
  type: 'DELETE_ENQUIRY_FAILURE',
  errorMessage: { errorMessage },
});

export const deleteUpdateEnquiry = () => ({
  type: 'RESET_DELETE_ENQUIRY',
});
