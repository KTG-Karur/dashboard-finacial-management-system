// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createExpenseEntry, getExpenseEntry, updateExpenseEntry } from '../../api/ExpenseEntryApi'; // Adjust the path as needed
import { 
  getExpenseEntrySuccess, getExpenseEntryFailure,
  createExpenseEntrySuccess,
  createExpenseEntryFailure,
  updateExpenseEntrySuccess,
  updateExpenseEntryFailure,
} from './actions';

// Saga to handle fetching expenseEntrys
function* fetchExpenseEntrySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getExpenseEntry, action.payload);
    yield put(getExpenseEntrySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getExpenseEntryFailure(errorMessage));
  }
}

// // Saga to handle creating a expenseEntry
function* createExpenseEntrySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createExpenseEntry, action.payload);
    yield put(createExpenseEntrySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createExpenseEntryFailure(errorMessage));
  }
}

// // Saga to handle updating a expenseEntry
function* updateExpenseEntrySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateExpenseEntry, action.payload.data, action.payload.id);
    yield put(updateExpenseEntrySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateExpenseEntryFailure(errorMessage));
  }
}

// // Saga to handle updating a expenseEntry
// function* deleteExpenseEntrySaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteExpenseEntry, action.payload.id);
//     yield put(deleteExpenseEntrySuccess(data));
//   } catch (error: any) {
//     yield put(deleteExpenseEntryFailure(error.message));
//   }
// }

export default function* expenseEntrySaga() {
  yield takeEvery('GET_EXPENSE_ENTRY_REQUEST', fetchExpenseEntrySaga);
  yield takeEvery('CREATE_EXPENSE_ENTRY_REQUEST', createExpenseEntrySaga);
  yield takeEvery('UPDATE_EXPENSE_ENTRY_REQUEST', updateExpenseEntrySaga);
  // yield takeEvery('DELETE_EXPENSE_ENTRY_REQUEST', deleteExpenseEntrySaga);
}
