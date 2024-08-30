// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createState, getState, updateState } from '../../api/StateApi'; // Adjust the path as needed
import { 
  getStateSuccess, getStateFailure,
  createStateSuccess,
  createStateFailure,
  updateStateSuccess,
  updateStateFailure,
} from './actions';

// Saga to handle fetching states
function* fetchStateSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getState, action.payload);
    yield put(getStateSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(getStateFailure(errorMessage));
  }
}

// // Saga to handle creating a state
function* createStateSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createState, action.payload);
    yield put(createStateSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(createStateFailure(errorMessage));
  }
}

// // Saga to handle updating a state
function* updateStateSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateState, action.payload.data, action.payload.id);
    yield put(updateStateSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(updateStateFailure(errorMessage));
  }
}

// // Saga to handle updating a state
// function* deleteStateSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteState, action.payload.id);
//     yield put(deleteStateSuccess(data));
//   } catch (error: any) {
//     yield put(deleteStateFailure(errorMessage));
//   }
// }

export default function* stateSaga() {
  yield takeEvery('GET_STATE_REQUEST', fetchStateSaga);
  yield takeEvery('CREATE_STATE_REQUEST', createStateSaga);
  yield takeEvery('UPDATE_STATE_REQUEST', updateStateSaga);
  // yield takeEvery('DELETE_STATE_REQUEST', deleteStateSaga);
}
