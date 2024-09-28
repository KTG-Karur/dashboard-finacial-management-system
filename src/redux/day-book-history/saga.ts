// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createDayBookHistory, getDayBookHistory, updateDayBookHistory } from '../../api/DayBookHistoryApi'; // Adjust the path as needed
import { 
  getDayBookHistorySuccess, getDayBookHistoryFailure,
  createDayBookHistorySuccess,
  createDayBookHistoryFailure,
  updateDayBookHistorySuccess,
  updateDayBookHistoryFailure,
} from './actions';

// Saga to handle fetching dayBookHistorys
function* fetchDayBookHistorySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getDayBookHistory, action.payload);
    yield put(getDayBookHistorySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getDayBookHistoryFailure(errorMessage));
  }
}

// // Saga to handle creating a dayBookHistory
function* createDayBookHistorySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createDayBookHistory, action.payload);
    yield put(createDayBookHistorySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createDayBookHistoryFailure(errorMessage));
  }
}

// // Saga to handle updating a dayBookHistory
function* updateDayBookHistorySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateDayBookHistory, action.payload.data, action.payload.id);
    yield put(updateDayBookHistorySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateDayBookHistoryFailure(errorMessage));
  }
}

// // Saga to handle updating a dayBookHistory
// function* deleteDayBookHistorySaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteDayBookHistory, action.payload.id);
//     yield put(deleteDayBookHistorySuccess(data));
//   } catch (error: any) {
//     yield put(deleteDayBookHistoryFailure(error.message));
//   }
// }

export default function* dayBookHistorySaga() {
  yield takeEvery('GET_DAY_BOOK_HISTORY_REQUEST', fetchDayBookHistorySaga);
  yield takeEvery('CREATE_DAY_BOOK_HISTORY_REQUEST', createDayBookHistorySaga);
  yield takeEvery('UPDATE_DAY_BOOK_HISTORY_REQUEST', updateDayBookHistorySaga);
  // yield takeEvery('DELETE_DAY_BOOK_HISTORY_REQUEST', deleteDayBookHistorySaga);
}
