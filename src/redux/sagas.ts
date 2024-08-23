import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import departmentSaga from './department/saga';

export default function* rootSaga() {
    yield all([authSaga(), 
        layoutSaga(),
        departmentSaga(),
    ]);
}
