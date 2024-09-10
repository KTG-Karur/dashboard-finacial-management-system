// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createApplicant, deleteApplicantAddressInfo, deleteApplicantProof, getApplicant, getApplicantInfo, updateApplicant } from '../../api/ApplicantApi'; // Adjust the path as needed
import { 
  getApplicantSuccess, getApplicantFailure,
  createApplicantSuccess,
  createApplicantFailure,
  updateApplicantSuccess,
  updateApplicantFailure,
  getApplicantInfoSuccess,
  getApplicantInfoFailure,
  deleteApplicantAddressSuccess,
  deleteApplicantAddressFailure,
  deleteApplicantProofSuccess,
  deleteApplicantProofFailure,
} from './actions';

// Saga to handle fetching applicants
function* fetchApplicantSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getApplicant, action.payload);
    yield put(getApplicantSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getApplicantFailure(errorMessage));
  }
}

function* fetchApplicantInfoSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getApplicantInfo, action.payload);
    yield put(getApplicantInfoSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getApplicantInfoFailure(errorMessage));
  }
}

// // Saga to handle creating a applicant
function* createApplicantSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createApplicant, action.payload);
    yield put(createApplicantSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createApplicantFailure(errorMessage));
  }
}

// // Saga to handle updating a applicant
function* updateApplicantSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateApplicant, action.payload.data, action.payload.id);
    yield put(updateApplicantSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateApplicantFailure(errorMessage));
  }
}

// // Saga to handle updating a applicant
function* deleteApplicantAddressSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(deleteApplicantAddressInfo, action.payload.id);
    yield put(deleteApplicantAddressSuccess(data));
  } catch (error: any) {
    yield put(deleteApplicantAddressFailure(error.message));
  }
}

function* deleteApplicantProofSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(deleteApplicantProof, action.payload.id);
    yield put(deleteApplicantProofSuccess(data));
  } catch (error: any) {
    yield put(deleteApplicantProofFailure(error.message));
  }
}

export default function* applicantSaga() {
  yield takeEvery('GET_APPLICANT_REQUEST', fetchApplicantSaga);
  yield takeEvery('GET_APPLICANT_INFO_REQUEST', fetchApplicantInfoSaga);
  yield takeEvery('CREATE_APPLICANT_REQUEST', createApplicantSaga);
  yield takeEvery('UPDATE_APPLICANT_REQUEST', updateApplicantSaga);
  yield takeEvery('DELETE_APPLICANT_ADDRESS_REQUEST', deleteApplicantAddressSaga);
  yield takeEvery('DELETE_APPLICANT_PROOF_REQUEST', deleteApplicantProofSaga);
}
