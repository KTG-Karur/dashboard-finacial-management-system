// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createApplicantType, getApplicantType, updateApplicantType } from '../../api/ApplicantTypeApi'; // Adjust the path as needed
import { 
  getApplicantTypeSuccess, getApplicantTypeFailure,
  createApplicantTypeSuccess,
  createApplicantTypeFailure,
  updateApplicantTypeSuccess,
  updateApplicantTypeFailure,
} from './actions';

// Saga to handle fetching applicantTypes
function* fetchApplicantTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getApplicantType, action.payload);
    yield put(getApplicantTypeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getApplicantTypeFailure(errorMessage));
  }
}

// // Saga to handle creating a applicantType
function* createApplicantTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createApplicantType, action.payload);
    yield put(createApplicantTypeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(createApplicantTypeFailure(errorMessage));
  }
}

// // Saga to handle updating a applicantType
function* updateApplicantTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateApplicantType, action.payload.data, action.payload.id);
    yield put(updateApplicantTypeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(updateApplicantTypeFailure(errorMessage));
  }
}

// // Saga to handle updating a applicantType
// function* deleteApplicantTypeSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteApplicantType, action.payload.id);
//     yield put(deleteApplicantTypeSuccess(data));
//   } catch (error: any) {
  // const errorMessage = error.response && error.response.data && error.response.data.message
  // ? error.response.data.message
  // : error.message
  //   ? error.message
  //   : 'An unexpected error occurred';
//     yield put(deleteApplicantTypeFailure(errorMessage));
//   }
// }

export default function* applicantTypeSaga() {
  yield takeEvery('GET_APPLICANT_TYPE_REQUEST', fetchApplicantTypeSaga);
  yield takeEvery('CREATE_APPLICANT_TYPE_REQUEST', createApplicantTypeSaga);
  yield takeEvery('UPDATE_APPLICANT_TYPE_REQUEST', updateApplicantTypeSaga);
  // yield takeEvery('DELETE_APPLICANT_TYPE_REQUEST', deleteApplicantTypeSaga);
}
