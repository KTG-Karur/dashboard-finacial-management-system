//Get Reducer Call--->
export const getApplicantRequest = (params?: any) => ({
  type: 'GET_APPLICANT_REQUEST',
  payload: params,
});

export const getApplicantSuccess = (data: any) => ({
  type: 'GET_APPLICANT_SUCCESS',
  payload: { data },
});

export const getApplicantFailure = (errorMessage: string) => ({
  type: 'GET_APPLICANT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetApplicant = () => ({
  type: 'RESET_GET_APPLICANT',
});

//Get-Details Reducer Call--->
export const getApplicantInfoRequest = (params?: any) => ({
  type: 'GET_APPLICANT_INFO_REQUEST',
  payload: params,
});

export const getApplicantInfoSuccess = (data: any) => ({
  type: 'GET_APPLICANT_INFO_SUCCESS',
  payload: { data },
});

export const getApplicantInfoFailure = (errorMessage: string) => ({
  type: 'GET_APPLICANT_INFO_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetApplicantInfo = () => ({
  type: 'RESET_GET_APPLICANT_INFO',
});

//Create Reducer Call--->
export const createApplicantRequest = (data: any) => ({
  type: 'CREATE_APPLICANT_REQUEST',
  payload: data,
});

export const createApplicantSuccess = (data: any) => ({
  type: 'CREATE_APPLICANT_SUCCESS',
  payload: { data },
});

export const createApplicantFailure = (errorMessage: string) => ({
  type: 'CREATE_APPLICANT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateApplicant = () => ({
  type: 'RESET_CREATE_APPLICANT',
});

//Update Reducer Call--->
export const updateApplicantRequest = ( data: any, id: string) => ({
  type: 'UPDATE_APPLICANT_REQUEST',
  payload: { data, id },
});

export const updateApplicantSuccess = (data: any) => ({
  type: 'UPDATE_APPLICANT_SUCCESS',
  payload: { data },
});

export const updateApplicantFailure = (errorMessage: string) => ({
  type: 'UPDATE_APPLICANT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateApplicant = () => ({
  type: 'RESET_UPDATE_APPLICANT',
});
//Delete Reducer Call--->
// export const deleteApplicantRequest = ( id: string) => ({
//   type: 'DELETE_APPLICANT_REQUEST',
//   payload: { id },
// });

// export const deleteApplicantSuccess = (data: any) => ({
//   type: 'DELETE_APPLICANT_SUCCESS',
//   payload: { data },
// });

// export const deleteApplicantFailure = (errorMessage: string) => ({
//   type: 'DELETE_APPLICANT_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateApplicant = () => ({
//   type: 'RESET_DELETE_APPLICANT',
// });
