//Get Reducer Call--->
export const getAddressTypeRequest = (params?: any) => ({
  type: 'GET_ADDRESS_TYPE_REQUEST',
  payload: params,
});

export const getAddressTypeSuccess = (data: any) => ({
  type: 'GET_ADDRESS_TYPE_SUCCESS',
  payload: { data },
});

export const getAddressTypeFailure = (errorMessage: string) => ({
  type: 'GET_ADDRESS_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetAddressType = () => ({
  type: 'RESET_GET_ADDRESS_TYPE',
});

//Create Reducer Call--->
export const createAddressTypeRequest = (data: any) => ({
  type: 'CREATE_ADDRESS_TYPE_REQUEST',
  payload: data,
});

export const createAddressTypeSuccess = (data: any) => ({
  type: 'CREATE_ADDRESS_TYPE_SUCCESS',
  payload: { data },
});

export const createAddressTypeFailure = (errorMessage: string) => ({
  type: 'CREATE_ADDRESS_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateAddressType = () => ({
  type: 'RESET_CREATE_ADDRESS_TYPE',
});

//Update Reducer Call--->
export const updateAddressTypeRequest = ( data: any, id: string) => ({
  type: 'UPDATE_ADDRESS_TYPE_REQUEST',
  payload: { data, id },
});

export const updateAddressTypeSuccess = (data: any) => ({
  type: 'UPDATE_ADDRESS_TYPE_SUCCESS',
  payload: { data },
});

export const updateAddressTypeFailure = (errorMessage: string) => ({
  type: 'UPDATE_ADDRESS_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateAddressType = () => ({
  type: 'RESET_UPDATE_ADDRESS_TYPE',
});
//Delete Reducer Call--->
// export const deleteAddressTypeRequest = ( id: string) => ({
//   type: 'DELETE_ADDRESS_TYPE_REQUEST',
//   payload: { id },
// });

// export const deleteAddressTypeSuccess = (data: any) => ({
//   type: 'DELETE_ADDRESS_TYPE_SUCCESS',
//   payload: { data },
// });

// export const deleteAddressTypeFailure = (errorMessage: string) => ({
//   type: 'DELETE_ADDRESS_TYPE_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateAddressType = () => ({
//   type: 'RESET_DELETE_ADDRESS_TYPE',
// });
