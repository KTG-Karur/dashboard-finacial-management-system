// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createDisbursedMethod, getDisbursedMethod, updateDisbursedMethod } from '../../api/DisbursedMethodApi'; // Adjust the path as needed
import { 
  getDisbursedMethodSuccess, getDisbursedMethodFailure,
  createDisbursedMethodSuccess,
  createDisbursedMethodFailure,
  updateDisbursedMethodSuccess,
  updateDisbursedMethodFailure,
} from './actions';

// Saga to handle fetching disbursedMethods
function* fetchDisbursedMethodSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getDisbursedMethod, action.payload);
    yield put(getDisbursedMethodSuccess(data));
  } catch (error: any) {
    yield put(getDisbursedMethodFailure(error.message));
  }
}

// // Saga to handle creating a disbursedMethod
function* createDisbursedMethodSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createDisbursedMethod, action.payload);
    yield put(createDisbursedMethodSuccess(data));
  } catch (error: any) {
    yield put(createDisbursedMethodFailure(error.message));
  }
}

// // Saga to handle updating a disbursedMethod
function* updateDisbursedMethodSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateDisbursedMethod, action.payload.data, action.payload.id);
    yield put(updateDisbursedMethodSuccess(data));
  } catch (error: any) {
    yield put(updateDisbursedMethodFailure(error.message));
  }
}

// // Saga to handle updating a disbursedMethod
// function* deleteDisbursedMethodSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteDisbursedMethod, action.payload.id);
//     yield put(deleteDisbursedMethodSuccess(data));
//   } catch (error: any) {
//     yield put(deleteDisbursedMethodFailure(error.message));
//   }
// }

export default function* disbursedMethodSaga() {
  yield takeEvery('GET_DISBURSED_METHOD_REQUEST', fetchDisbursedMethodSaga);
  yield takeEvery('CREATE_DISBURSED_METHOD_REQUEST', createDisbursedMethodSaga);
  yield takeEvery('UPDATE_DISBURSED_METHOD_REQUEST', updateDisbursedMethodSaga);
  // yield takeEvery('DELETE_DISBURSED_METHOD_REQUEST', deleteDisbursedMethodSaga);
}
