//Get Reducer Call--->
export const getSearchApplicantRequest = (params?: any) => ({
  type: 'GET_SEARCH_APPLICANT_REQUEST',
  payload: params,
});

export const getSearchApplicantSuccess = (data: any) => ({
  type: 'GET_SEARCH_APPLICANT_SUCCESS',
  payload: { data },
});

export const getSearchApplicantFailure = (errorMessage: string) => ({
  type: 'GET_SEARCH_APPLICANT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetSearchApplicant = () => ({
  type: 'RESET_GET_SEARCH_APPLICANT',
});
//Get Reducer Call--->
export const getSearchApplicantDetailsRequest = (params?: any) => ({
  type: 'GET_SEARCH_APPLICANT_DETAILS_REQUEST',
  payload: params,
});

export const getSearchApplicantDetailsSuccess = (data: any) => ({
  type: 'GET_SEARCH_APPLICANT_DETAILS_SUCCESS',
  payload: { data },
});

export const getSearchApplicantDetailsFailure = (errorMessage: string) => ({
  type: 'GET_SEARCH_APPLICANT_DETAILS_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetSearchApplicantDetails = () => ({
  type: 'RESET_GET_SEARCH_APPLICANT_DETAILS',
});
