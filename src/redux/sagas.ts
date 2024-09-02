import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import departmentSaga from './department/saga';
import designationSaga from './designation/saga';
import districtSaga from './district/saga';
import stateSaga from './state/saga';
import countrySaga from './country/saga';
import categorySaga from './category/saga';
import subCategorySaga from './sub-category/saga';
import applicantTypeSaga from './applicant-type/saga';
import disbursedMethodSaga from './disbursed-method/saga';
import expensiveTypeSaga from './expensive-type/saga';
import incomeTypeSaga from './income-type/saga';
import addressTypeSaga from './address-type/saga';
import proofTypeSaga from './proof-type/saga';
import bankAccountSaga from './bank-account/saga';
import expenseEntrySaga from './expense-entry/saga';
import incomeEntrySaga from './income-entry/saga';
import roleSaga from './role/saga';
import addLoanSaga from './add-loan/saga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        layoutSaga(),
        departmentSaga(),
        designationSaga(),
        districtSaga(),
        stateSaga(),
        countrySaga(),
        categorySaga(),
        subCategorySaga(),
        applicantTypeSaga(),
        disbursedMethodSaga(),
        expensiveTypeSaga(),
        incomeTypeSaga(),
        addressTypeSaga(),
        proofTypeSaga(),
        bankAccountSaga(),
        expenseEntrySaga(),
        incomeEntrySaga(),
        roleSaga(),
        addLoanSaga(),
    ]);
}
