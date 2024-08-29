// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAddressType, getAddressType, updateAddressType } from '../../api/AddressTypeApi'; // Adjust the path as needed
import { 
  getAddressTypeSuccess, getAddressTypeFailure,
  createAddressTypeSuccess,
  createAddressTypeFailure,
  updateAddressTypeSuccess,
  updateAddressTypeFailure,
} from './actions';

// Saga to handle fetching addressTypes
function* fetchAddressTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getAddressType, action.payload);
    yield put(getAddressTypeSuccess(data));
  } catch (error: any) {
    yield put(getAddressTypeFailure(error.message));
  }
}

// // Saga to handle creating a addressType
function* createAddressTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createAddressType, action.payload);
    yield put(createAddressTypeSuccess(data));
  } catch (error: any) {
    yield put(createAddressTypeFailure(error.message));
  }
}

// // Saga to handle updating a addressType
function* updateAddressTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateAddressType, action.payload.data, action.payload.id);
    yield put(updateAddressTypeSuccess(data));
  } catch (error: any) {
    yield put(updateAddressTypeFailure(error.message));
  }
}

// // Saga to handle updating a addressType
// function* deleteAddressTypeSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteAddressType, action.payload.id);
//     yield put(deleteAddressTypeSuccess(data));
//   } catch (error: any) {
//     yield put(deleteAddressTypeFailure(error.message));
//   }
// }

export default function* addressTypeSaga() {
  yield takeEvery('GET_ADDRESS_TYPE_REQUEST', fetchAddressTypeSaga);
  yield takeEvery('CREATE_ADDRESS_TYPE_REQUEST', createAddressTypeSaga);
  yield takeEvery('UPDATE_ADDRESS_TYPE_REQUEST', updateAddressTypeSaga);
  // yield takeEvery('DELETE_ADDRESS_TYPE_REQUEST', deleteAddressTypeSaga);
}
