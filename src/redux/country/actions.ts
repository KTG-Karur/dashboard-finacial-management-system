//Get Reducer Call--->
export const getCountryRequest = (params?: any) => ({
  type: 'GET_COUNTRY_REQUEST',
  payload: params,
});

export const getCountrySuccess = (data: any) => ({
  type: 'GET_COUNTRY_SUCCESS',
  payload: { data },
});

export const getCountryFailure = (errorMessage: string) => ({
  type: 'GET_COUNTRY_FAILURE',
  errorMessage,
});

export const resetGetCountry = () => ({
  type: 'RESET_GET_COUNTRY',
});

//Create Reducer Call--->
export const createCountryRequest = (data: any) => ({
  type: 'CREATE_COUNTRY_REQUEST',
  payload: data,
});

export const createCountrySuccess = (data: any) => ({
  type: 'CREATE_COUNTRY_SUCCESS',
  payload: { data },
});

export const createCountryFailure = (errorMessage: string) => ({
  type: 'CREATE_COUNTRY_FAILURE',
  errorMessage,
});

export const resetCreateCountry = () => ({
  type: 'RESET_CREATE_COUNTRY',
});

//Update Reducer Call--->
export const updateCountryRequest = ( data: any, id: string) => ({
  type: 'UPDATE_COUNTRY_REQUEST',
  payload: { data, id },
});

export const updateCountrySuccess = (data: any) => ({
  type: 'UPDATE_COUNTRY_SUCCESS',
  payload: { data },
});

export const updateCountryFailure = (errorMessage: string) => ({
  type: 'UPDATE_COUNTRY_FAILURE',
  errorMessage,
});

export const resetUpdateCountry = () => ({
  type: 'RESET_UPDATE_COUNTRY',
});
//Delete Reducer Call--->
// export const deleteCountryRequest = ( id: string) => ({
//   type: 'DELETE_COUNTRY_REQUEST',
//   payload: { id },
// });

// export const deleteCountrySuccess = (data: any) => ({
//   type: 'DELETE_COUNTRY_SUCCESS',
//   payload: { data },
// });

// export const deleteCountryFailure = (errorMessage: string) => ({
//   type: 'DELETE_COUNTRY_FAILURE',
//   errorMessage,
// });

// export const deleteUpdateCountry = () => ({
//   type: 'RESET_DELETE_COUNTRY',
// });
