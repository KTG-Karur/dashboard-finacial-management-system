// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createExpensiveType, getExpensiveType, updateExpensiveType } from '../../api/ExpensiveTypeApi'; // Adjust the path as needed
import { 
  getExpensiveTypeSuccess, getExpensiveTypeFailure,
  createExpensiveTypeSuccess,
  createExpensiveTypeFailure,
  updateExpensiveTypeSuccess,
  updateExpensiveTypeFailure,
} from './actions';

// Saga to handle fetching expensiveTypes
function* fetchExpensiveTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getExpensiveType, action.payload);
    yield put(getExpensiveTypeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(getExpensiveTypeFailure(errorMessage));
  }
}

// // Saga to handle creating a expensiveType
function* createExpensiveTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createExpensiveType, action.payload);
    yield put(createExpensiveTypeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(createExpensiveTypeFailure(errorMessage));
  }
}

// // Saga to handle updating a expensiveType
function* updateExpensiveTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateExpensiveType, action.payload.data, action.payload.id);
    yield put(updateExpensiveTypeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(updateExpensiveTypeFailure(errorMessage));
  }
}

// // Saga to handle updating a expensiveType
// function* deleteExpensiveTypeSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteExpensiveType, action.payload.id);
//     yield put(deleteExpensiveTypeSuccess(data));
//   } catch (error: any) {
//     yield put(deleteExpensiveTypeFailure(errorMessage));
//   }
// }

export default function* expensiveTypeSaga() {
  yield takeEvery('GET_EXPENSIVE_TYPE_REQUEST', fetchExpensiveTypeSaga);
  yield takeEvery('CREATE_EXPENSIVE_TYPE_REQUEST', createExpensiveTypeSaga);
  yield takeEvery('UPDATE_EXPENSIVE_TYPE_REQUEST', updateExpensiveTypeSaga);
  // yield takeEvery('DELETE_EXPENSIVE_TYPE_REQUEST', deleteExpensiveTypeSaga);
}
