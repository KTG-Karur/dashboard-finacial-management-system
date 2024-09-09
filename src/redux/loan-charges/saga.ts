// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createLoanCharges, deleteLoanCharges, getLoanCharges, updateLoanCharges } from '../../api/LoanChargesApi'; // Adjust the path as needed
import {
    getLoanChargesSuccess,
    getLoanChargesFailure,
    createLoanChargesSuccess,
    createLoanChargesFailure,
    updateLoanChargesSuccess,
    updateLoanChargesFailure,
    deleteLoanChargesSuccess,
    deleteLoanChargesFailure,
} from './actions';

// Saga to handle fetching loanChargess
function* fetchLoanChargesSaga(action: any): Generator<any, any, any> {
    try {
        const data = yield call(getLoanCharges, action.payload);
        yield put(getLoanChargesSuccess(data));
    } catch (error: any) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message
                ? error.message
                : 'An unexpected error occurred';

        yield put(getLoanChargesFailure(errorMessage));
    }
}

// // Saga to handle creating a loanCharges
function* createLoanChargesSaga(action: any): Generator<any, any, any> {
    try {
        const data = yield call(createLoanCharges, action.payload);
        yield put(createLoanChargesSuccess(data));
    } catch (error: any) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message
                ? error.message
                : 'An unexpected error occurred';

        yield put(createLoanChargesFailure(errorMessage));
    }
}

// // Saga to handle updating a loanCharges
function* updateLoanChargesSaga(action: any): Generator<any, any, any> {
    try {
        const data = yield call(updateLoanCharges, action.payload.data, action.payload.id);
        yield put(updateLoanChargesSuccess(data));
    } catch (error: any) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message
                ? error.message
                : 'An unexpected error occurred';

        yield put(updateLoanChargesFailure(errorMessage));
    }
}

// Saga to handle updating a loanCharges
function* deleteLoanChargesSaga(action: any): Generator<any, any, any> {
    try {
        const data = yield call(deleteLoanCharges, action.payload.id);
        yield put(deleteLoanChargesSuccess(data));
    } catch (error: any) {
        yield put(deleteLoanChargesFailure(error.message));
    }
}

export default function* loanChargesSaga() {
    yield takeEvery('GET_LOANCHARGES_REQUEST', fetchLoanChargesSaga);
    yield takeEvery('CREATE_LOANCHARGES_REQUEST', createLoanChargesSaga);
    yield takeEvery('UPDATE_LOANCHARGES_REQUEST', updateLoanChargesSaga);
    yield takeEvery('DELETE_LOANCHARGES_REQUEST', deleteLoanChargesSaga);
}
