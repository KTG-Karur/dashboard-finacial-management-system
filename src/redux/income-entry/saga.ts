// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createIncomeEntry, getIncomeEntry, updateIncomeEntry } from '../../api/IncomeEntryApi'; // Adjust the path as needed
import { 
  getIncomeEntrySuccess, getIncomeEntryFailure,
  createIncomeEntrySuccess,
  createIncomeEntryFailure,
  updateIncomeEntrySuccess,
  updateIncomeEntryFailure,
} from './actions';

// Saga to handle fetching incomeEntrys
function* fetchIncomeEntrySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getIncomeEntry, action.payload);
    yield put(getIncomeEntrySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getIncomeEntryFailure(errorMessage));
  }
}

// // Saga to handle creating a incomeEntry
function* createIncomeEntrySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createIncomeEntry, action.payload);
    yield put(createIncomeEntrySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createIncomeEntryFailure(errorMessage));
  }
}

// // Saga to handle updating a incomeEntry
function* updateIncomeEntrySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateIncomeEntry, action.payload.data, action.payload.id);
    yield put(updateIncomeEntrySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateIncomeEntryFailure(errorMessage));
  }
}

// // Saga to handle updating a incomeEntry
// function* deleteIncomeEntrySaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteIncomeEntry, action.payload.id);
//     yield put(deleteIncomeEntrySuccess(data));
//   } catch (error: any) {
//     yield put(deleteIncomeEntryFailure(error.message));
//   }
// }

export default function* incomeEntrySaga() {
  yield takeEvery('GET_INCOME_ENTRY_REQUEST', fetchIncomeEntrySaga);
  yield takeEvery('CREATE_INCOME_ENTRY_REQUEST', createIncomeEntrySaga);
  yield takeEvery('UPDATE_INCOME_ENTRY_REQUEST', updateIncomeEntrySaga);
  // yield takeEvery('DELETE_INCOME_ENTRY_REQUEST', deleteIncomeEntrySaga);
}
