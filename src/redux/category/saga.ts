// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createCategory, getCategory, updateCategory } from '../../api/CategoryApi'; // Adjust the path as needed
import { 
  getCategorySuccess, getCategoryFailure,
  createCategorySuccess,
  createCategoryFailure,
  updateCategorySuccess,
  updateCategoryFailure,
} from './actions';

// Saga to handle fetching categorys
function* fetchCategorySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getCategory, action.payload);
    yield put(getCategorySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(getCategoryFailure(errorMessage));
  }
}

// // Saga to handle creating a category
function* createCategorySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createCategory, action.payload);
    yield put(createCategorySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(createCategoryFailure(errorMessage));
  }
}

// // Saga to handle updating a category
function* updateCategorySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateCategory, action.payload.data, action.payload.id);
    yield put(updateCategorySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(updateCategoryFailure(errorMessage));
  }
}

// // Saga to handle updating a category
// function* deleteCategorySaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteCategory, action.payload.id);
//     yield put(deleteCategorySuccess(data));
//   } catch (error: any) {
//     yield put(deleteCategoryFailure(errorMessage));
//   }
// }

export default function* categorySaga() {
  yield takeEvery('GET_CATEGORY_REQUEST', fetchCategorySaga);
  yield takeEvery('CREATE_CATEGORY_REQUEST', createCategorySaga);
  yield takeEvery('UPDATE_CATEGORY_REQUEST', updateCategorySaga);
  // yield takeEvery('DELETE_DEPARTMENT_REQUEST', deleteCategorySaga);
}
