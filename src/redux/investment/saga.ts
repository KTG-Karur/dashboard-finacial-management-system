// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createInvestment, getInvestment, getInvestmentDetails, updateInvestment } from '../../api/InvestmentApi'; // Adjust the path as needed
import { 
  getInvestmentSuccess, getInvestmentFailure,
  createInvestmentSuccess,
  createInvestmentFailure,
  updateInvestmentSuccess,
  updateInvestmentFailure,
  getInvestmentDetailsSuccess,
  getInvestmentDetailsFailure,
} from './actions';

// Saga to handle fetching investments
function* fetchInvestmentSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getInvestment, action.payload);
    yield put(getInvestmentSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getInvestmentFailure(errorMessage));
  }
}

// Saga to handle fetching investments
function* fetchInvestmentDetailsSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getInvestmentDetails, action.payload);
    yield put(getInvestmentDetailsSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getInvestmentDetailsFailure(errorMessage));
  }
}

// // Saga to handle creating a investment
function* createInvestmentSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createInvestment, action.payload);
    yield put(createInvestmentSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createInvestmentFailure(errorMessage));
  }
}

// // Saga to handle updating a investment
function* updateInvestmentSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateInvestment, action.payload.data, action.payload.id);
    yield put(updateInvestmentSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateInvestmentFailure(errorMessage));
  }
}

export default function* investmentSaga() {
  yield takeEvery('GET_INVESTMENT_REQUEST', fetchInvestmentSaga);
  yield takeEvery('GET_INVESTMENT_DETAILS_REQUEST', fetchInvestmentDetailsSaga);
  yield takeEvery('CREATE_INVESTMENT_REQUEST', createInvestmentSaga);
  yield takeEvery('UPDATE_INVESTMENT_REQUEST', updateInvestmentSaga);
}
