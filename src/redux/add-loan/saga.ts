// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAddLoan, getAddLoan, getAddLoanDetails, updateAddLoan } from '../../api/AddLoanApi'; // Adjust the path as needed
import {
    getAddLoanSuccess,
    getAddLoanFailure,
    createAddLoanSuccess,
    createAddLoanFailure,
    updateAddLoanSuccess,
    updateAddLoanFailure,
    getAddLoanDetailsSuccess,
    getAddLoanDetailsFailure,
} from './actions';

// Saga to handle fetching addLoans
function* fetchAddLoanSaga(action: any): Generator<any, any, any> {
    try {
        const data = yield call(getAddLoan, action.payload);
        yield put(getAddLoanSuccess(data));
    } catch (error: any) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message
                ? error.message
                : 'An unexpected error occurred';

        yield put(getAddLoanFailure(errorMessage));
    }
}

function* fetchAddLoanDetailsSaga(action: any): Generator<any, any, any> {
    try {
        const data = yield call(getAddLoanDetails, action.payload);
        yield put(getAddLoanDetailsSuccess(data));
    } catch (error: any) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message
                ? error.message
                : 'An unexpected error occurred';

        yield put(getAddLoanDetailsFailure(errorMessage));
    }
}

// // Saga to handle creating a addLoan
function* createAddLoanSaga(action: any): Generator<any, any, any> {
    try {
        const data = yield call(createAddLoan, action.payload);
        yield put(createAddLoanSuccess(data));
    } catch (error: any) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message
                ? error.message
                : 'An unexpected error occurred';

        yield put(createAddLoanFailure(errorMessage));
    }
}

// // Saga to handle updating a addLoan
function* updateAddLoanSaga(action: any): Generator<any, any, any> {
    try {
        const data = yield call(updateAddLoan, action.payload.data, action.payload.id);
        yield put(updateAddLoanSuccess(data));
    } catch (error: any) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message
                ? error.message
                : 'An unexpected error occurred';

        yield put(updateAddLoanFailure(errorMessage));
    }
}

// // Saga to handle updating a addLoan
// function* deleteAddLoanSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteAddLoan, action.payload.id);
//     yield put(deleteAddLoanSuccess(data));
//   } catch (error: any) {
//     yield put(deleteAddLoanFailure(error.message));
//   }
// }

export default function* addLoanSaga() {
    yield takeEvery('GET_ADDLOAN_REQUEST', fetchAddLoanSaga);
    yield takeEvery('GET_ADDLOAN_DETAILS_REQUEST', fetchAddLoanDetailsSaga);
    yield takeEvery('CREATE_ADDLOAN_REQUEST', createAddLoanSaga);
    yield takeEvery('UPDATE_ADDLOAN_REQUEST', updateAddLoanSaga);
    // yield takeEvery('DELETE_ADDLOAN_REQUEST', deleteAddLoanSaga);
}
