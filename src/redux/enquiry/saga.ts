// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createEnquiry, deleteEnquiry, getEnquiry, updateEnquiry } from '../../api/EnquiryApi'; // Adjust the path as needed
import { 
  getEnquirySuccess, getEnquiryFailure,
  createEnquirySuccess,
  createEnquiryFailure,
  updateEnquirySuccess,
  updateEnquiryFailure,
  deleteEnquirySuccess,
  deleteEnquiryFailure,
} from './actions';

// Saga to handle fetching enquirys
function* fetchEnquirySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getEnquiry, action.payload);
    yield put(getEnquirySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getEnquiryFailure(errorMessage));
  }
}

// // Saga to handle creating a enquiry
function* createEnquirySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createEnquiry, action.payload);
    yield put(createEnquirySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createEnquiryFailure(errorMessage));
  }
}

// // Saga to handle updating a enquiry
function* updateEnquirySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateEnquiry, action.payload.data, action.payload.id);
    yield put(updateEnquirySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateEnquiryFailure(errorMessage));
  }
}

// // Saga to handle updating a enquiry
function* deleteEnquirySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(deleteEnquiry, action.payload.id);
    yield put(deleteEnquirySuccess(data));
  } catch (error: any) {
    yield put(deleteEnquiryFailure(error.message));
  }
}

export default function* enquirySaga() {
  yield takeEvery('GET_ENQUIRY_REQUEST', fetchEnquirySaga);
  yield takeEvery('CREATE_ENQUIRY_REQUEST', createEnquirySaga);
  yield takeEvery('UPDATE_ENQUIRY_REQUEST', updateEnquirySaga);
  yield takeEvery('DELETE_ENQUIRY_REQUEST', deleteEnquirySaga);
}
