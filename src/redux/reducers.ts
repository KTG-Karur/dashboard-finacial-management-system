import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Layout from './layout/reducers';
import PageTitle from './pageTitle/reducers';
import employeeReducer from './reducers/employeeReducer';

export default combineReducers({
    Auth,
    Layout,
    PageTitle,
    employeeReducer,
});
