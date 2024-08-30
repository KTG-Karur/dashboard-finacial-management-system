// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createDistrict, getDistrict, updateDistrict } from '../../api/DistrictApi';
import { 
  getDistrictSuccess, getDistrictFailure,
  createDistrictSuccess,
  createDistrictFailure,
  updateDistrictSuccess,
  updateDistrictFailure,
} from './actions';

// Saga to handle fetching districts
function* fetchDistrictSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getDistrict, action.payload);
    yield put(getDistrictSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(getDistrictFailure(errorMessage));
  }
}

// // Saga to handle creating a district
function* createDistrictSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createDistrict, action.payload);
    yield put(createDistrictSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(createDistrictFailure(errorMessage));
  }
}

// // Saga to handle updating a district
function* updateDistrictSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateDistrict, action.payload.data, action.payload.id);
    yield put(updateDistrictSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(updateDistrictFailure(errorMessage));
  }
}

// // Saga to handle updating a district
// function* deleteDistrictSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteDistrict, action.payload.id);
//     yield put(deleteDistrictSuccess(data));
//   } catch (error: any) {
//     yield put(deleteDistrictFailure(errorMessage));
//   }
// }

export default function* districtSaga() {
  yield takeEvery('GET_DISTRICT_REQUEST', fetchDistrictSaga);
  yield takeEvery('CREATE_DISTRICT_REQUEST', createDistrictSaga);
  yield takeEvery('UPDATE_DISTRICT_REQUEST', updateDistrictSaga);
  // yield takeEvery('DELETE_DISTRICT_REQUEST', deleteDistrictSaga);
}
