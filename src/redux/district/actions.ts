//Get Reducer Call--->
export const getDistrictRequest = (params?: any) => ({
  type: 'GET_DISTRICT_REQUEST',
  payload: params,
});

export const getDistrictSuccess = (data: any) => ({
  type: 'GET_DISTRICT_SUCCESS',
  payload: { data },
});

export const getDistrictFailure = (errorMessage: string) => ({
  type: 'GET_DISTRICT_FAILURE',
  errorMessage,
});

export const resetGetDistrict = () => ({
  type: 'RESET_GET_DISTRICT',
});

//Create Reducer Call--->
export const createDistrictRequest = (data: any) => ({
  type: 'CREATE_DISTRICT_REQUEST',
  payload: data,
});

export const createDistrictSuccess = (data: any) => ({
  type: 'CREATE_DISTRICT_SUCCESS',
  payload: { data },
});

export const createDistrictFailure = (errorMessage: string) => ({
  type: 'CREATE_DISTRICT_FAILURE',
  errorMessage,
});

export const resetCreateDistrict = () => ({
  type: 'RESET_CREATE_DISTRICT',
});

//Update Reducer Call--->
export const updateDistrictRequest = ( data: any, id: string) => ({
  type: 'UPDATE_DISTRICT_REQUEST',
  payload: { data, id },
});

export const updateDistrictSuccess = (data: any) => ({
  type: 'UPDATE_DISTRICT_SUCCESS',
  payload: { data },
});

export const updateDistrictFailure = (errorMessage: string) => ({
  type: 'UPDATE_DISTRICT_FAILURE',
  errorMessage,
});

export const resetUpdateDistrict = () => ({
  type: 'RESET_UPDATE_DISTRICT',
});
//Delete Reducer Call--->
// export const deleteDistrictRequest = ( id: string) => ({
//   type: 'DELETE_DISTRICT_REQUEST',
//   payload: { id },
// });

// export const deleteDistrictSuccess = (data: any) => ({
//   type: 'DELETE_DISTRICT_SUCCESS',
//   payload: { data },
// });

// export const deleteDistrictFailure = (errorMessage: string) => ({
//   type: 'DELETE_DISTRICT_FAILURE',
//   errorMessage,
// });

// export const deleteUpdateDistrict = () => ({
//   type: 'RESET_DELETE_DISTRICT',
// });
