// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createContra, getContra, updateContra } from '../../api/ContraApi'; // Adjust the path as needed
import { 
  getContraSuccess, getContraFailure,
  createContraSuccess,
  createContraFailure,
  updateContraSuccess,
  updateContraFailure,
} from './actions';

// Saga to handle fetching contras
function* fetchContraSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getContra, action.payload);
    yield put(getContraSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getContraFailure(errorMessage));
  }
}

// // Saga to handle creating a contra
function* createContraSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createContra, action.payload);
    yield put(createContraSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createContraFailure(errorMessage));
  }
}

// // Saga to handle updating a contra
function* updateContraSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateContra, action.payload.data, action.payload.id);
    yield put(updateContraSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateContraFailure(errorMessage));
  }
}

// // Saga to handle updating a contra
// function* deleteContraSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteContra, action.payload.id);
//     yield put(deleteContraSuccess(data));
//   } catch (error: any) {
//     yield put(deleteContraFailure(error.message));
//   }
// }

export default function* contraSaga() {
  yield takeEvery('GET_CONTRA_REQUEST', fetchContraSaga);
  yield takeEvery('CREATE_CONTRA_REQUEST', createContraSaga);
  yield takeEvery('UPDATE_CONTRA_REQUEST', updateContraSaga);
  // yield takeEvery('DELETE_CONTRA_REQUEST', deleteContraSaga);
}
