// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createDuePayment, getDuePayment, getDuePaymentDetails, updateDuePayment } from '../../api/DuePaymentApi'; // Adjust the path as needed
import {  getDuePaymentSuccess, getDuePaymentFailure,createDuePaymentSuccess, createDuePaymentFailure, updateDuePaymentSuccess, updateDuePaymentFailure, getDuePaymentDetailsSuccess, getDuePaymentDetailsFailure, getInvestorDuePaymentSuccess, getInvestorDuePaymentFailure,
} from './actions';
import { getInvestorDuePaymentDetails, getInvestorDuePaymentHistory } from '../../api/DuePaymentHistoryApi';

// Saga to handle fetching duePayments
function* fetchDuePaymentSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getDuePayment, action.payload);
    yield put(getDuePaymentSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getDuePaymentFailure(errorMessage));
  }
}
// Saga to handle fetching duePayments
function* fetchInvestorDuePaymentSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getInvestorDuePaymentHistory, action.payload);
    yield put(getInvestorDuePaymentSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getInvestorDuePaymentFailure(errorMessage));
  }
}
// Saga to handle fetching duePayments
function* fetchInvestorDuePaymentDetailsSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getInvestorDuePaymentDetails, action.payload);
    yield put(getInvestorDuePaymentSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getInvestorDuePaymentFailure(errorMessage));
  }
}
// Saga to handle fetching duePayments
function* fetchDuePaymentDetailsSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getDuePaymentDetails, action.payload);
    yield put(getDuePaymentDetailsSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getDuePaymentDetailsFailure(errorMessage));
  }
}

// // Saga to handle creating a duePayment
function* createDuePaymentSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createDuePayment, action.payload);
    yield put(createDuePaymentSuccess(data));
  } catch (error: any) {
    
    const errorMessage = error ? error
      : 'An unexpected error occurred';
    console.log(error)
    yield put(createDuePaymentFailure(errorMessage));
  }
}

// // Saga to handle updating a duePayment
function* updateDuePaymentSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateDuePayment, action.payload.data, action.payload.id);
    yield put(updateDuePaymentSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateDuePaymentFailure(errorMessage));
  }
}

// // Saga to handle updating a duePayment
// function* deleteDuePaymentSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteDuePayment, action.payload.id);
//     yield put(deleteDuePaymentSuccess(data));
//   } catch (error: any) {
//     yield put(deleteDuePaymentFailure(error.message));
//   }
// }

export default function* duePaymentSaga() {
  yield takeEvery('GET_DUE_PAYMENT_REQUEST', fetchDuePaymentSaga);
  yield takeEvery('GET_INVESTOR_DUE_PAYMENT_REQUEST', fetchInvestorDuePaymentSaga);
  yield takeEvery('GET_INVESTOR_DUE_PAYMENT_DETAILS_REQUEST', fetchInvestorDuePaymentDetailsSaga);
  yield takeEvery('GET_DUE_PAYMENT_DETAILS_REQUEST', fetchDuePaymentDetailsSaga);
  yield takeEvery('CREATE_DUE_PAYMENT_REQUEST', createDuePaymentSaga);
  yield takeEvery('UPDATE_DUE_PAYMENT_REQUEST', updateDuePaymentSaga);
  // yield takeEvery('DELETE_DUE_PAYMENT_REQUEST', deleteDuePaymentSaga);
}
