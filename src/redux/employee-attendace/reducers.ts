// employee/reducers.ts
const initialState = {
  getEmployeeAttendanceList: [],
  createEmployeeAttendanceData: null,
  updateEmployeeAttendanceData: null,
  isLoading: false,
  errorMessage: null,
  getEmployeeAttendanceSuccess: false,
  getEmployeeAttendanceFailure: false,
  createEmployeeAttendanceSuccess: false,
  createEmployeeAttendanceFailure: false,
  updateEmployeeAttendanceSuccess: false,
  updateEmployeeAttendanceFailure: false,
  deleteEmployeeAttendanceSuccess: false,
  deleteEmployeeAttendanceFailure: false,
};

export default function employeeAttendanceReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_EMPLOYEE_ATTENDANCE_SUCCESS": {
      return {
        ...state,
        getEmployeeAttendanceSuccess: true,
        getEmployeeAttendanceList: action.payload.data.data,
        getEmployeeAttendanceFailure: false,
      };
    }
    case "GET_EMPLOYEE_ATTENDANCE_FAILURE": {
      return {
        ...state,
        getEmployeeAttendanceFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getEmployeeAttendanceSuccess: false,
      };
    }
    case "RESET_GET_EMPLOYEE_ATTENDANCE": {
      return {
        ...state,
        getEmployeeAttendanceSuccess: false,
        getEmployeeAttendanceFailure: false,
        getEmployeeAttendanceList: [],
        errorMessage: null,
      };
    }

    case "GET_EMPLOYEE_ATTENDANCE_REPORT_SUCCESS": {
      return {
        ...state,
        getEmployeeAttendanceReportSuccess: true,
        getEmployeeAttendanceReportList: action.payload.data.data,
        getEmployeeAttendanceReportFailure: false,
      };
    }
    case "GET_EMPLOYEE_ATTENDANCE_REPORT_FAILURE": {
      return {
        ...state,
        getEmployeeAttendanceReportFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getEmployeeAttendanceReportSuccess: false,
      };
    }
    case "RESET_GET_EMPLOYEE_ATTENDANCE_REPORT": {
      return {
        ...state,
        getEmployeeAttendanceReportSuccess: false,
        getEmployeeAttendanceReportFailure: false,
        getEmployeeAttendanceReportList: [],
        errorMessage: null,
      };
    }

    case "CREATE_EMPLOYEE_ATTENDANCE_SUCCESS": {
      return {
        ...state,
        createEmployeeAttendanceSuccess: true,
        createEmployeeAttendanceData: action.payload.data.data,
        createEmployeeAttendanceFailure: false,
      };
    }
    case "CREATE_EMPLOYEE_ATTENDANCE_FAILURE": {
      return {
        ...state,
        createEmployeeAttendanceFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createEmployeeAttendanceSuccess: false,
      };
    }
    case "RESET_CREATE_EMPLOYEE_ATTENDANCE": {
      return {
        ...state,
        createEmployeeAttendanceSuccess: false,
        createEmployeeAttendanceFailure: false,
        createEmployeeAttendanceData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_EMPLOYEE_ATTENDANCE_SUCCESS": {
      return {
        ...state,
        updateEmployeeAttendanceSuccess: true,
        updateEmployeeAttendanceData: action.payload.data.data,
        updateEmployeeAttendanceFailure: false,
      };
    }
    case "UPDATE_EMPLOYEE_ATTENDANCE_FAILURE": {
      return {
        ...state,
        updateEmployeeAttendanceFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateEmployeeAttendanceSuccess: false,
      };
    }
    case "RESET_UPDATE_EMPLOYEE_ATTENDANCE": {
      return {
        ...state,
        updateEmployeeAttendanceSuccess: false,
        updateEmployeeAttendanceFailure: false,
        updateEmployeeAttendanceData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_EMPLOYEE_ATTENDANCE_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteEmployeeAttendanceSuccess: true,
    //     deleteEmployeeAttendanceFailure: false,
    //   };
    // }
    // case "DELETE_EMPLOYEE_ATTENDANCE_FAILURE": {
    //   return {
    //     ...state,
    //     deleteEmployeeAttendanceFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteEmployeeAttendanceSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_EMPLOYEE_ATTENDANCE": {
    //   return {
    //     ...state,
    //     deleteEmployeeAttendanceSuccess: false,
    //     deleteEmployeeAttendanceFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
