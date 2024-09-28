// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createDuePaymentHistory, getDuePaymentHistory, updateDuePaymentHistory } from '../../api/DuePaymentHistoryApi'; // Adjust the path as needed
import { 
  getDuePaymentHistorySuccess, getDuePaymentHistoryFailure,
  createDuePaymentHistorySuccess,
  createDuePaymentHistoryFailure,
  updateDuePaymentHistorySuccess,
  updateDuePaymentHistoryFailure,
} from './actions';

// Saga to handle fetching duePaymentHistorys
function* fetchDuePaymentHistorySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getDuePaymentHistory, action.payload);
    yield put(getDuePaymentHistorySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getDuePaymentHistoryFailure(errorMessage));
  }
}

// // Saga to handle creating a duePaymentHistory
function* createDuePaymentHistorySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createDuePaymentHistory, action.payload);
    yield put(createDuePaymentHistorySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createDuePaymentHistoryFailure(errorMessage));
  }
}

// // Saga to handle updating a duePaymentHistory
function* updateDuePaymentHistorySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateDuePaymentHistory, action.payload.data, action.payload.id);
    yield put(updateDuePaymentHistorySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateDuePaymentHistoryFailure(errorMessage));
  }
}

// // Saga to handle updating a duePaymentHistory
// function* deleteDuePaymentHistorySaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteDuePaymentHistory, action.payload.id);
//     yield put(deleteDuePaymentHistorySuccess(data));
//   } catch (error: any) {
//     yield put(deleteDuePaymentHistoryFailure(error.message));
//   }
// }

export default function* duePaymentHistorySaga() {
  yield takeEvery('GET_DUE_PAYMENT_HISTORY_REQUEST', fetchDuePaymentHistorySaga);
  yield takeEvery('CREATE_DUE_PAYMENT_HISTORY_REQUEST', createDuePaymentHistorySaga);
  yield takeEvery('UPDATE_DUE_PAYMENT_HISTORY_REQUEST', updateDuePaymentHistorySaga);
  // yield takeEvery('DELETE_DUE_PAYMENT_HISTORY_REQUEST', deleteDuePaymentHistorySaga);
}
