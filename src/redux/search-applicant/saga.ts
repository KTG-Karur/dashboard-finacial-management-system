// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { getSearchApplicant, getSearchApplicantDetails } from '../../api/SearchApplicantApi'; 
import { 
  getSearchApplicantSuccess, getSearchApplicantFailure,
  getSearchApplicantDetailsSuccess,
} from './actions';

// Saga to handle fetching searchApplicants
function* fetchSearchApplicantSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getSearchApplicant, action.payload);
    yield put(getSearchApplicantSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(getSearchApplicantFailure(errorMessage));
  }
}
// Saga to handle fetching searchApplicants
function* fetchSearchApplicantDetailsSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getSearchApplicantDetails, action.payload);
    yield put(getSearchApplicantDetailsSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(getSearchApplicantDetailsSuccess(errorMessage));
  }
}

export default function* searchApplicantSaga() {
  yield takeEvery('GET_SEARCH_APPLICANT_REQUEST', fetchSearchApplicantSaga);
  yield takeEvery('GET_SEARCH_APPLICANT_DETAILS_REQUEST', fetchSearchApplicantDetailsSaga);
}
