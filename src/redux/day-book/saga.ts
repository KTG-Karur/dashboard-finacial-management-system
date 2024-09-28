// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createDayBook, getDayBook, updateDayBook } from '../../api/DayBookApi'; // Adjust the path as needed
import { 
  getDayBookSuccess, getDayBookFailure,
  createDayBookSuccess,
  createDayBookFailure,
  updateDayBookSuccess,
  updateDayBookFailure,
} from './actions';

// Saga to handle fetching dayBooks
function* fetchDayBookSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getDayBook, action.payload);
    yield put(getDayBookSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getDayBookFailure(errorMessage));
  }
}

// // Saga to handle creating a dayBook
function* createDayBookSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createDayBook, action.payload);
    yield put(createDayBookSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createDayBookFailure(errorMessage));
  }
}

// // Saga to handle updating a dayBook
function* updateDayBookSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateDayBook, action.payload.data, action.payload.id);
    yield put(updateDayBookSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateDayBookFailure(errorMessage));
  }
}

// // Saga to handle updating a dayBook
// function* deleteDayBookSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteDayBook, action.payload.id);
//     yield put(deleteDayBookSuccess(data));
//   } catch (error: any) {
//     yield put(deleteDayBookFailure(error.message));
//   }
// }

export default function* dayBookSaga() {
  yield takeEvery('GET_DAY_BOOK_REQUEST', fetchDayBookSaga);
  yield takeEvery('CREATE_DAY_BOOK_REQUEST', createDayBookSaga);
  yield takeEvery('UPDATE_DAY_BOOK_REQUEST', updateDayBookSaga);
  // yield takeEvery('DELETE_DAY_BOOK_REQUEST', deleteDayBookSaga);
}
