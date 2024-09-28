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
import employeeReducer from './employee/reducers';
import loanChargesTypeReducer from './loan-charges-type/reducers';
import duePaymentReducer from './due-payment/reducers';
import investmentReducer from './investment/reducers';
import duePaymentHistoryReducer from './due-payment-history/reducers';
import dayBookReducer from './day-book/reducers';
import dayBookHistoryReducer from './day-book-history/reducers';
import ledgerReducer from './ledger/reducers';
import searchApplicantReducer from './search-applicant/reducers';
import employeeAttendanceReducer from './employee-attendace/reducers';
import enquiryReducer from './enquiry/reducers';
import loginReducer from './login/reducers';
import faqReducer from './faq/reducers';

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
    employeeReducer,
    loanChargesTypeReducer,
    duePaymentReducer,
    investmentReducer,
    duePaymentHistoryReducer,
    dayBookReducer,
    dayBookHistoryReducer,
    ledgerReducer,
    searchApplicantReducer,
    employeeAttendanceReducer,
    enquiryReducer,
    loginReducer,
    faqReducer,
});
