// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createDepartment, getDepartment, updateDepartment } from '../../api/DepartmentApi'; // Adjust the path as needed
import { 
  getDepartmentSuccess, getDepartmentFailure,
  createDepartmentSuccess,
  createDepartmentFailure,
  updateDepartmentSuccess,
  updateDepartmentFailure,
} from './actions';

// Saga to handle fetching departments
function* fetchDepartmentSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getDepartment, action.payload);
    yield put(getDepartmentSuccess(data));
  } catch (error: any) {
    yield put(getDepartmentFailure(error.message));
  }
}

// // Saga to handle creating a department
function* createDepartmentSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createDepartment, action.payload);
    yield put(createDepartmentSuccess(data));
  } catch (error: any) {
    yield put(createDepartmentFailure(error.message));
  }
}

// // Saga to handle updating a department
function* updateDepartmentSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateDepartment, action.payload.data, action.payload.id);
    yield put(updateDepartmentSuccess(data));
  } catch (error: any) {
    yield put(updateDepartmentFailure(error.message));
  }
}

// // Saga to handle updating a department
// function* deleteDepartmentSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteDepartment, action.payload.id);
//     yield put(deleteDepartmentSuccess(data));
//   } catch (error: any) {
//     yield put(deleteDepartmentFailure(error.message));
//   }
// }

export default function* departmentSaga() {
  yield takeEvery('GET_DEPARTMENT_REQUEST', fetchDepartmentSaga);
  yield takeEvery('CREATE_DEPARTMENT_REQUEST', createDepartmentSaga);
  yield takeEvery('UPDATE_DEPARTMENT_REQUEST', updateDepartmentSaga);
  // yield takeEvery('DELETE_DEPARTMENT_REQUEST', deleteDepartmentSaga);
}
