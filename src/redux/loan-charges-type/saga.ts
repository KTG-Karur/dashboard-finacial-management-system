// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createLoanChargesType, getLoanChargesType, updateLoanChargesType } from '../../api/LoanChargesType'; // Adjust the path as needed
import { 
  getLoanChargesTypeSuccess, getLoanChargesTypeFailure,
  createLoanChargesTypeSuccess,
  createLoanChargesTypeFailure,
  updateLoanChargesTypeSuccess,
  updateLoanChargesTypeFailure,
} from './actions';

// Saga to handle fetching loanChargesTypes
function* fetchLoanChargesTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getLoanChargesType, action.payload);
    yield put(getLoanChargesTypeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getLoanChargesTypeFailure(errorMessage));
  }
}

// // Saga to handle creating a loanChargesType
function* createLoanChargesTypeSaga(action: any): Generator<any, any, any> {
  try {
    console.log("action.payload")
    console.log(action.payload)
    const data = yield call(createLoanChargesType, action.payload);
    console.log("createLoanChargesTypeSaga")
    console.log(data)
    yield put(createLoanChargesTypeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createLoanChargesTypeFailure(errorMessage));
  }
}

// // Saga to handle updating a loanChargesType
function* updateLoanChargesTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateLoanChargesType, action.payload.data, action.payload.id);
    yield put(updateLoanChargesTypeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateLoanChargesTypeFailure(errorMessage));
  }
}

// // Saga to handle updating a loanChargesType
// function* deleteLoanChargesTypeSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteLoanChargesType, action.payload.id);
//     yield put(deleteLoanChargesTypeSuccess(data));
//   } catch (error: any) {
//     yield put(deleteLoanChargesTypeFailure(error.message));
//   }
// }

export default function* loanChargesTypeSaga() {
  yield takeEvery('GET_LOAN_CHARGES_TYPE_REQUEST', fetchLoanChargesTypeSaga);
  yield takeEvery('CREATE_LOAN_CHARGES_TYPE_REQUEST', createLoanChargesTypeSaga);
  yield takeEvery('UPDATE_LOAN_CHARGES_TYPE_REQUEST', updateLoanChargesTypeSaga);
  // yield takeEvery('DELETE_LOAN_CHARGES_TYPE_REQUEST', deleteLoanChargesTypeSaga);
}
