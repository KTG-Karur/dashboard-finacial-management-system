// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createEmployeeAttendance, getEmployeeAttendance, getEmployeeAttendanceReport, updateEmployeeAttendance } from '../../api/EmployeeAttendanceApi'; // Adjust the path as needed
import { 
  getEmployeeAttendanceSuccess, getEmployeeAttendanceFailure,
  createEmployeeAttendanceSuccess,
  createEmployeeAttendanceFailure,
  updateEmployeeAttendanceSuccess,
  updateEmployeeAttendanceFailure,
  getEmployeeAttendanceReportSuccess,
  getEmployeeAttendanceReportFailure,
} from './actions';

// Saga to handle fetching employeeAttendances
function* fetchEmployeeAttendanceSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getEmployeeAttendance, action.payload);
    yield put(getEmployeeAttendanceSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getEmployeeAttendanceFailure(errorMessage));
  }
}

// Saga to handle fetching employeeAttendances
function* fetchEmployeeAttendanceReportSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getEmployeeAttendanceReport, action.payload);
    yield put(getEmployeeAttendanceReportSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(getEmployeeAttendanceReportFailure(errorMessage));
  }
}

// // Saga to handle creating a employeeAttendance
function* createEmployeeAttendanceSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createEmployeeAttendance, action.payload);
    yield put(createEmployeeAttendanceSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(createEmployeeAttendanceFailure(errorMessage));
  }
}

// // Saga to handle updating a employeeAttendance
function* updateEmployeeAttendanceSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateEmployeeAttendance, action.payload.data, action.payload.id);
    yield put(updateEmployeeAttendanceSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateEmployeeAttendanceFailure(errorMessage));
  }
}

// // Saga to handle updating a employeeAttendance
// function* deleteEmployeeAttendanceSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteEmployeeAttendance, action.payload.id);
//     yield put(deleteEmployeeAttendanceSuccess(data));
//   } catch (error: any) {
//     yield put(deleteEmployeeAttendanceFailure(error.message));
//   }
// }

export default function* employeeAttendanceSaga() {
  yield takeEvery('GET_EMPLOYEE_ATTENDANCE_REQUEST', fetchEmployeeAttendanceSaga);
  yield takeEvery('GET_EMPLOYEE_ATTENDANCE_REPORT_REQUEST', fetchEmployeeAttendanceReportSaga);
  yield takeEvery('CREATE_EMPLOYEE_ATTENDANCE_REQUEST', createEmployeeAttendanceSaga);
  yield takeEvery('UPDATE_EMPLOYEE_ATTENDANCE_REQUEST', updateEmployeeAttendanceSaga);
  // yield takeEvery('DELETE_EMPLOYEE_ATTENDANCE_REQUEST', deleteEmployeeAttendanceSaga);
}
