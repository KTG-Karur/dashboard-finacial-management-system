export const getDepartmentRequest = (params?: any) => ({
  type: 'GET_DEPARTMENT_REQUEST',
  payload: params,
});

// Action to trigger creating a department
export const createDepartmentRequest = (data: any) => ({
  type: 'CREATE_DEPARTMENT_REQUEST',
  payload: data,
});

// Action to trigger updating a department
export const updateDepartmentRequest = (id: string, data: any) => ({
  type: 'UPDATE_DEPARTMENT_REQUEST',
  payload: { id, data },
});

//----------------------------------
export const getDepartmentSuccess = (data: any) => ({
    type: 'GET_DEPARTMENT_SUCCESS',
    payload: { data },
  });
  
  export const getDepartmentFailure = (errorMessage: string) => ({
    type: 'GET_DEPARTMENT_FAILURE',
    errorMessage,
  });
  
  export const resetGetDepartment = () => ({
    type: 'RESET_GET_DEPARTMENT',
  });
  
  export const createDepartmentSuccess = (data: any) => ({
    type: 'CREATE_DEPARTMENT_SUCCESS',
    payload: { data },
  });
  
  export const createDepartmentFailure = (errorMessage: string) => ({
    type: 'CREATE_DEPARTMENT_FAILURE',
    errorMessage,
  });
  
  export const resetCreateDepartment = () => ({
    type: 'RESET_CREATE_DEPARTMENT',
  });
  
  export const updateDepartmentSuccess = (data: any) => ({
    type: 'UPDATE_DEPARTMENT_SUCCESS',
    payload: { data },
  });
  
  export const updateDepartmentFailure = (errorMessage: string) => ({
    type: 'UPDATE_DEPARTMENT_FAILURE',
    errorMessage,
  });
  
  export const resetUpdateDepartment = () => ({
    type: 'RESET_UPDATE_DEPARTMENT',
  });
  