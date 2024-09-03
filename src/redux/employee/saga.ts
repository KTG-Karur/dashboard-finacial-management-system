// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createEmployee, getEmployee, updateEmployee } from '../../api/EmployeeApi'; // Adjust the path as needed
import { 
  getEmployeeSuccess, getEmployeeFailure,
  createEmployeeSuccess,
  createEmployeeFailure,
  updateEmployeeSuccess,
  updateEmployeeFailure,
} from './actions';

// Saga to handle fetching employees
function* fetchEmployeeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getEmployee, action.payload);
    yield put(getEmployeeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getEmployeeFailure(errorMessage));
  }
}

// // Saga to handle creating a employee
function* createEmployeeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createEmployee, action.payload);
    yield put(createEmployeeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createEmployeeFailure(errorMessage));
  }
}

// // Saga to handle updating a employee
function* updateEmployeeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateEmployee, action.payload.data, action.payload.id);
    yield put(updateEmployeeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateEmployeeFailure(errorMessage));
  }
}

// // Saga to handle updating a employee
// function* deleteEmployeeSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteEmployee, action.payload.id);
//     yield put(deleteEmployeeSuccess(data));
//   } catch (error: any) {
//     yield put(deleteEmployeeFailure(error.message));
//   }
// }

export default function* employeeSaga() {
  yield takeEvery('GET_EMPLOYEE_REQUEST', fetchEmployeeSaga);
  yield takeEvery('CREATE_EMPLOYEE_REQUEST', createEmployeeSaga);
  yield takeEvery('UPDATE_EMPLOYEE_REQUEST', updateEmployeeSaga);
  // yield takeEvery('DELETE_EMPLOYEE_REQUEST', deleteEmployeeSaga);
}
