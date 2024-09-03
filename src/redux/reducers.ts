import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Layout from './layout/reducers';
import PageTitle from './pageTitle/reducers';
import departmentReducer from './department/reducers';
import designationReducer from './designation/reducers';
import districtReducer from './district/reducers';
import stateReducer from './state/reducers';
import countryReducer from './country/reducers';
import categoryReducer from './category/reducers';
import subCategoryReducer from './sub-category/reducers';
import disbursedMethodReducer from './disbursed-method/reducers';
import expensiveTypeReducer from './expensive-type/reducers';
import incomeTypeReducer from './income-type/reducers';
import applicantTypeReducer from './applicant-type/reducers';
import addressTypeReducer from './address-type/reducers';
import proofTypeReducer from './proof-type/reducers';
import bankAccountReducer from './bank-account/reducers';
import expenseEntryReducer from './expense-entry/reducers';
import incomeEntryReducer from './income-entry/reducers';
import roleReducer from './role/reducers';
import addLoanReducer from './add-loan/reducers';
import loanChargesReducer from './loan-charges/reducers';
import applicantReducer from './applicant/reducers';

export default combineReducers({
    Auth,
    Layout,
    PageTitle,
    departmentReducer,
    designationReducer,
    districtReducer,
    stateReducer,
    countryReducer,
    categoryReducer,
    subCategoryReducer,
    disbursedMethodReducer,
    applicantTypeReducer,
    expensiveTypeReducer,
    incomeTypeReducer,
    addressTypeReducer,
    proofTypeReducer,
    bankAccountReducer,
    expenseEntryReducer,
    incomeEntryReducer,
    roleReducer,
    addLoanReducer,
    loanChargesReducer,
    applicantReducer,
});
