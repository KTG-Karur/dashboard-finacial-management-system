// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createCountry, getCountry, updateCountry } from '../../api/CountryApi'; // Adjust the path as needed
import { 
  getCountrySuccess, getCountryFailure,
  createCountrySuccess,
  createCountryFailure,
  updateCountrySuccess,
  updateCountryFailure,
} from './actions';

// Saga to handle fetching countrys
function* fetchCountrySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getCountry, action.payload);
    yield put(getCountrySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(getCountryFailure(errorMessage));
  }
}

// // Saga to handle creating a country
function* createCountrySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createCountry, action.payload);
    yield put(createCountrySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(createCountryFailure(errorMessage));
  }
}

// // Saga to handle updating a country
function* updateCountrySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateCountry, action.payload.data, action.payload.id);
    yield put(updateCountrySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(updateCountryFailure(errorMessage));
  }
}

// // Saga to handle updating a country
// function* deleteCountrySaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteCountry, action.payload.id);
//     yield put(deleteCountrySuccess(data));
//   } catch (error: any) {
//     yield put(deleteCountryFailure(errorMessage));
//   }
// }

export default function* countrySaga() {
  yield takeEvery('GET_COUNTRY_REQUEST', fetchCountrySaga);
  yield takeEvery('CREATE_COUNTRY_REQUEST', createCountrySaga);
  yield takeEvery('UPDATE_COUNTRY_REQUEST', updateCountrySaga);
  // yield takeEvery('DELETE_COUNTRY_REQUEST', deleteCountrySaga);
}
