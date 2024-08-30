//Get Reducer Call--->
export const getApplicantTypeRequest = (params?: any) => ({
  type: 'GET_APPLICANT_TYPE_REQUEST',
  payload: params,
});

export const getApplicantTypeSuccess = (data: any) => ({
  type: 'GET_APPLICANT_TYPE_SUCCESS',
  payload: { data },
});

export const getApplicantTypeFailure = (errorMessage: string) => ({
  type: 'GET_APPLICANT_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetApplicantType = () => ({
  type: 'RESET_GET_APPLICANT_TYPE',
});

//Create Reducer Call--->
export const createApplicantTypeRequest = (data: any) => ({
  type: 'CREATE_APPLICANT_TYPE_REQUEST',
  payload: data,
});

export const createApplicantTypeSuccess = (data: any) => ({
  type: 'CREATE_APPLICANT_TYPE_SUCCESS',
  payload: { data },
});

export const createApplicantTypeFailure = (errorMessage: string) => ({
  type: 'CREATE_APPLICANT_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateApplicantType = () => ({
  type: 'RESET_CREATE_APPLICANT_TYPE',
});

//Update Reducer Call--->
export const updateApplicantTypeRequest = ( data: any, id: string) => ({
  type: 'UPDATE_APPLICANT_TYPE_REQUEST',
  payload: { data, id },
});

export const updateApplicantTypeSuccess = (data: any) => ({
  type: 'UPDATE_APPLICANT_TYPE_SUCCESS',
  payload: { data },
});

export const updateApplicantTypeFailure = (errorMessage: string) => ({
  type: 'UPDATE_APPLICANT_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateApplicantType = () => ({
  type: 'RESET_UPDATE_APPLICANT_TYPE',
});
//Delete Reducer Call--->
// export const deleteApplicantTypeRequest = ( id: string) => ({
//   type: 'DELETE_APPLICANT_TYPE_REQUEST',
//   payload: { id },
// });

// export const deleteApplicantTypeSuccess = (data: any) => ({
//   type: 'DELETE_APPLICANT_TYPE_SUCCESS',
//   payload: { data },
// });

// export const deleteApplicantTypeFailure = (errorMessage: string) => ({
//   type: 'DELETE_APPLICANT_TYPE_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateApplicantType = () => ({
//   type: 'RESET_DELETE_APPLICANT_TYPE',
// });
