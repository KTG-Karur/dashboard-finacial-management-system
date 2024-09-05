// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAddLoan, getAddLoan, updateAddLoan } from '../../api/AddLoanApi'; // Adjust the path as needed
import {
    getAddLoanSuccess,
    getAddLoanFailure,
    createAddLoanSuccess,
    createAddLoanFailure,
    updateAddLoanSuccess,
    updateAddLoanFailure,
} from './actions';

// Saga to handle fetching addLoans
function* fetchAddLoanSaga(action: any): Generator<any, any, any> {
    try {
        console.log("action.payload")
        console.log(action.payload)
        const data = yield call(getAddLoan, action.payload);
        console.log("data in get add loan")
        console.log(data)
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

// // Saga to handle creating a addLoan
function* createAddLoanSaga(action: any): Generator<any, any, any> {
    try {
        const data = yield call(createAddLoan, action.payload);
        console.log('saga create Add loan action payloan');
        console.log(action.payload);
        console.log('saga data in add loan ');
        console.log(data);
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
        console.log('action.payload.data')
        console.log(action.payload.data)
        console.log("action.payload.id")
        console.log(action.payload.id)
        const data = yield call(updateAddLoan, action.payload.data, action.payload.id);
        console.log("data")
        console.log(data)
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
    yield takeEvery('CREATE_ADDLOAN_REQUEST', createAddLoanSaga);
    yield takeEvery('UPDATE_ADDLOAN_REQUEST', updateAddLoanSaga);
    // yield takeEvery('DELETE_ADDLOAN_REQUEST', deleteAddLoanSaga);
}
