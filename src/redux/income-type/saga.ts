// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createIncomeType, getIncomeType, updateIncomeType } from '../../api/IncomeTypeApi'; // Adjust the path as needed
import { 
  getIncomeTypeSuccess, getIncomeTypeFailure,
  createIncomeTypeSuccess,
  createIncomeTypeFailure,
  updateIncomeTypeSuccess,
  updateIncomeTypeFailure,
} from './actions';

// Saga to handle fetching incomeTypes
function* fetchIncomeTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getIncomeType, action.payload);
    yield put(getIncomeTypeSuccess(data));
  } catch (error: any) {
    yield put(getIncomeTypeFailure(error.message));
  }
}

// // Saga to handle creating a incomeType
function* createIncomeTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createIncomeType, action.payload);
    yield put(createIncomeTypeSuccess(data));
  } catch (error: any) {
    yield put(createIncomeTypeFailure(error.message));
  }
}

// // Saga to handle updating a incomeType
function* updateIncomeTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateIncomeType, action.payload.data, action.payload.id);
    yield put(updateIncomeTypeSuccess(data));
  } catch (error: any) {
    yield put(updateIncomeTypeFailure(error.message));
  }
}

// // Saga to handle updating a incomeType
// function* deleteIncomeTypeSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteIncomeType, action.payload.id);
//     yield put(deleteIncomeTypeSuccess(data));
//   } catch (error: any) {
//     yield put(deleteIncomeTypeFailure(error.message));
//   }
// }

export default function* incomeTypeSaga() {
  yield takeEvery('GET_INCOME_TYPE_REQUEST', fetchIncomeTypeSaga);
  yield takeEvery('CREATE_INCOME_TYPE_REQUEST', createIncomeTypeSaga);
  yield takeEvery('UPDATE_INCOME_TYPE_REQUEST', updateIncomeTypeSaga);
  // yield takeEvery('DELETE_INCOME_TYPE_REQUEST', deleteIncomeTypeSaga);
}
