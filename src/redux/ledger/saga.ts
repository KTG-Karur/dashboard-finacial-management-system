// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { getCustomerLedger, getEmployeeLedger, getLedgerDetails } from '../../api/LedgerApi'; // Adjust the path as needed
import { 
  getLedgerCustomerSuccess, getLedgerCustomerFailure,
  getLedgerEmployeeSuccess, getLedgerEmployeeFailure,
  getLedgerDetailsSuccess,
  getLedgerDetailsFailure,
} from './actions';

// Saga to handle fetching ledgers
function* fetchCustomerLedgerSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getCustomerLedger, action.payload);
    yield put(getLedgerCustomerSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getLedgerCustomerFailure(errorMessage));
  }
}
// Saga to handle fetching ledgers
function* fetchEmployeeLedgerSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getEmployeeLedger, action.payload);
    yield put(getLedgerEmployeeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getLedgerEmployeeFailure(errorMessage));
  }
}
// Saga to handle fetching ledgers
function* fetchLedgerDetailsSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getLedgerDetails, action.payload);
    yield put(getLedgerDetailsSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getLedgerDetailsFailure(errorMessage));
  }
}

export default function* ledgerSaga() {
  yield takeEvery('GET_LEDGER_CUSTOMER_REQUEST', fetchCustomerLedgerSaga);
  yield takeEvery('GET_LEDGER_EMPLOYEE_REQUEST', fetchEmployeeLedgerSaga);
  yield takeEvery('GET_LEDGER_DETAILS_REQUEST', fetchLedgerDetailsSaga);
}
