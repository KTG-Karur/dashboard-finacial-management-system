//Get Reducer Call--->
export const getInvestmentRequest = (params?: any) => ({
  type: 'GET_INVESTMENT_REQUEST',
  payload: params,
});

export const getInvestmentSuccess = (data: any) => ({
  type: 'GET_INVESTMENT_SUCCESS',
  payload: { data },
});

export const getInvestmentFailure = (errorMessage: string) => ({
  type: 'GET_INVESTMENT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetInvestment = () => ({
  type: 'RESET_GET_INVESTMENT',
});

//Get Reducer Call--->
export const getInvestmentDetailsRequest = (params?: any) => ({
  type: 'GET_INVESTMENT_DETAILS_REQUEST',
  payload: params,
});

export const getInvestmentDetailsSuccess = (data: any) => ({
  type: 'GET_INVESTMENT_DETAILS_SUCCESS',
  payload: { data },
});

export const getInvestmentDetailsFailure = (errorMessage: string) => ({
  type: 'GET_INVESTMENT_DETAILS_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetInvestmentDetails = () => ({
  type: 'RESET_GET_INVESTMENT_DETAILS',
});

//Create Reducer Call--->
export const createInvestmentRequest = (data: any) => ({
  type: 'CREATE_INVESTMENT_REQUEST',
  payload: data,
});

export const createInvestmentSuccess = (data: any) => ({
  type: 'CREATE_INVESTMENT_SUCCESS',
  payload: { data },
});

export const createInvestmentFailure = (errorMessage: string) => ({
  type: 'CREATE_INVESTMENT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateInvestment = () => ({
  type: 'RESET_CREATE_INVESTMENT',
});

//Update Reducer Call--->
export const updateInvestmentRequest = ( data: any, id: string) => ({
  type: 'UPDATE_INVESTMENT_REQUEST',
  payload: { data, id },
});

export const updateInvestmentSuccess = (data: any) => ({
  type: 'UPDATE_INVESTMENT_SUCCESS',
  payload: { data },
});

export const updateInvestmentFailure = (errorMessage: string) => ({
  type: 'UPDATE_INVESTMENT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateInvestment = () => ({
  type: 'RESET_UPDATE_INVESTMENT',
});
