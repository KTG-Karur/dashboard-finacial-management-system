// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createFaq, deleteFaq, getFaq, updateFaq } from '../../api/FaqApi'; // Adjust the path as needed
import { 
  getFaqSuccess, getFaqFailure,
  createFaqSuccess,
  createFaqFailure,
  updateFaqSuccess,
  updateFaqFailure,
  deleteFaqSuccess,
  deleteFaqFailure,
} from './actions';

// Saga to handle fetching faqs
function* fetchFaqSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getFaq, action.payload);
    yield put(getFaqSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getFaqFailure(errorMessage));
  }
}

// // Saga to handle creating a faq
function* createFaqSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createFaq, action.payload);
    yield put(createFaqSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createFaqFailure(errorMessage));
  }
}

// // Saga to handle updating a faq
function* updateFaqSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateFaq, action.payload.data, action.payload.id);
    yield put(updateFaqSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateFaqFailure(errorMessage));
  }
}

// // Saga to handle updating a faq
function* deleteFaqSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(deleteFaq, action.payload.id);
    yield put(deleteFaqSuccess(data));
  } catch (error: any) {
    yield put(deleteFaqFailure(error.message));
  }
}

export default function* faqSaga() {
  yield takeEvery('GET_FAQ_REQUEST', fetchFaqSaga);
  yield takeEvery('CREATE_FAQ_REQUEST', createFaqSaga);
  yield takeEvery('UPDATE_FAQ_REQUEST', updateFaqSaga);
  yield takeEvery('DELETE_FAQ_REQUEST', deleteFaqSaga);
}
