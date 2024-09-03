//Get Reducer Call--->
export const getEmployeeRequest = (params?: any) => ({
  type: 'GET_EMPLOYEE_REQUEST',
  payload: params,
});

export const getEmployeeSuccess = (data: any) => ({
  type: 'GET_EMPLOYEE_SUCCESS',
  payload: { data },
});

export const getEmployeeFailure = (errorMessage: string) => ({
  type: 'GET_EMPLOYEE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetEmployee = () => ({
  type: 'RESET_GET_EMPLOYEE',
});

//Create Reducer Call--->
export const createEmployeeRequest = (data: any) => ({
  type: 'CREATE_EMPLOYEE_REQUEST',
  payload: data,
});

export const createEmployeeSuccess = (data: any) => ({
  type: 'CREATE_EMPLOYEE_SUCCESS',
  payload: { data },
});

export const createEmployeeFailure = (errorMessage: string) => ({
  type: 'CREATE_EMPLOYEE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateEmployee = () => ({
  type: 'RESET_CREATE_EMPLOYEE',
});

//Update Reducer Call--->
export const updateEmployeeRequest = ( data: any, id: string) => ({
  type: 'UPDATE_EMPLOYEE_REQUEST',
  payload: { data, id },
});

export const updateEmployeeSuccess = (data: any) => ({
  type: 'UPDATE_EMPLOYEE_SUCCESS',
  payload: { data },
});

export const updateEmployeeFailure = (errorMessage: string) => ({
  type: 'UPDATE_EMPLOYEE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateEmployee = () => ({
  type: 'RESET_UPDATE_EMPLOYEE',
});
//Delete Reducer Call--->
// export const deleteEmployeeRequest = ( id: string) => ({
//   type: 'DELETE_EMPLOYEE_REQUEST',
//   payload: { id },
// });

// export const deleteEmployeeSuccess = (data: any) => ({
//   type: 'DELETE_EMPLOYEE_SUCCESS',
//   payload: { data },
// });

// export const deleteEmployeeFailure = (errorMessage: string) => ({
//   type: 'DELETE_EMPLOYEE_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateEmployee = () => ({
//   type: 'RESET_DELETE_EMPLOYEE',
// });
