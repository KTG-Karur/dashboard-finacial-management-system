//Get Reducer Call--->
export const getEmployeeAttendanceRequest = (params?: any) => ({
  type: 'GET_EMPLOYEE_ATTENDANCE_REQUEST',
  payload: params,
});

export const getEmployeeAttendanceSuccess = (data: any) => ({
  type: 'GET_EMPLOYEE_ATTENDANCE_SUCCESS',
  payload: { data },
});

export const getEmployeeAttendanceFailure = (errorMessage: string) => ({
  type: 'GET_EMPLOYEE_ATTENDANCE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetEmployeeAttendance = () => ({
  type: 'RESET_GET_EMPLOYEE_ATTENDANCE_REPORT',
});

//Get Reducer Call--->
export const getEmployeeAttendanceReportRequest = (params?: any) => ({
  type: 'GET_EMPLOYEE_ATTENDANCE_REPORT_REQUEST',
  payload: params,
});

export const getEmployeeAttendanceReportSuccess = (data: any) => ({
  type: 'GET_EMPLOYEE_ATTENDANCE_REPORT_SUCCESS',
  payload: { data },
});

export const getEmployeeAttendanceReportFailure = (errorMessage: string) => ({
  type: 'GET_EMPLOYEE_ATTENDANCE_REPORT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetEmployeeAttendanceReport = () => ({
  type: 'RESET_GET_EMPLOYEE_ATTENDANCE_REPORT',
});

//Create Reducer Call--->
export const createEmployeeAttendanceRequest = (data: any) => ({
  type: 'CREATE_EMPLOYEE_ATTENDANCE_REQUEST',
  payload: data,
});

export const createEmployeeAttendanceSuccess = (data: any) => ({
  type: 'CREATE_EMPLOYEE_ATTENDANCE_SUCCESS',
  payload: { data },
});

export const createEmployeeAttendanceFailure = (errorMessage: string) => ({
  type: 'CREATE_EMPLOYEE_ATTENDANCE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateEmployeeAttendance = () => ({
  type: 'RESET_CREATE_EMPLOYEE_ATTENDANCE',
});

//Update Reducer Call--->
export const updateEmployeeAttendanceRequest = ( data: any, id: string) => ({
  type: 'UPDATE_EMPLOYEE_ATTENDANCE_REQUEST',
  payload: { data, id },
});

export const updateEmployeeAttendanceSuccess = (data: any) => ({
  type: 'UPDATE_EMPLOYEE_ATTENDANCE_SUCCESS',
  payload: { data },
});

export const updateEmployeeAttendanceFailure = (errorMessage: string) => ({
  type: 'UPDATE_EMPLOYEE_ATTENDANCE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateEmployeeAttendance = () => ({
  type: 'RESET_UPDATE_EMPLOYEE_ATTENDANCE',
});
//Delete Reducer Call--->
// export const deleteEmployeeAttendanceRequest = ( id: string) => ({
//   type: 'DELETE_EMPLOYEE_ATTENDANCE_REQUEST',
//   payload: { id },
// });

// export const deleteEmployeeAttendanceSuccess = (data: any) => ({
//   type: 'DELETE_EMPLOYEE_ATTENDANCE_SUCCESS',
//   payload: { data },
// });

// export const deleteEmployeeAttendanceFailure = (errorMessage: string) => ({
//   type: 'DELETE_EMPLOYEE_ATTENDANCE_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateEmployeeAttendance = () => ({
//   type: 'RESET_DELETE_EMPLOYEE_ATTENDANCE',
// });
