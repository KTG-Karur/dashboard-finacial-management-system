// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createSubCategory, getSubCategory, updateSubCategory } from '../../api/SubCategoryApi'; // Adjust the path as needed
import { 
  getSubCategorySuccess, getSubCategoryFailure,
  createSubCategorySuccess,
  createSubCategoryFailure,
  updateSubCategorySuccess,
  updateSubCategoryFailure,
} from './actions';

// Saga to handle fetching subCategorys
function* fetchSubCategorySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getSubCategory, action.payload);
    yield put(getSubCategorySuccess(data));
  } catch (error: any) {
    yield put(getSubCategoryFailure(error.message));
  }
}

// // Saga to handle creating a subCategory
function* createSubCategorySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createSubCategory, action.payload);
    yield put(createSubCategorySuccess(data));
  } catch (error: any) {
    yield put(createSubCategoryFailure(error.message));
  }
}

// // Saga to handle updating a subCategory
function* updateSubCategorySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateSubCategory, action.payload.data, action.payload.id);
    yield put(updateSubCategorySuccess(data));
  } catch (error: any) {
    yield put(updateSubCategoryFailure(error.message));
  }
}

// // Saga to handle updating a subCategory
// function* deleteSubCategorySaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteSubCategory, action.payload.id);
//     yield put(deleteSubCategorySuccess(data));
//   } catch (error: any) {
//     yield put(deleteSubCategoryFailure(error.message));
//   }
// }

export default function* subCategorySaga() {
  yield takeEvery('GET_SUB_CATEGORY_REQUEST', fetchSubCategorySaga);
  yield takeEvery('CREATE_SUB_CATEGORY_REQUEST', createSubCategorySaga);
  yield takeEvery('UPDATE_SUB_CATEGORY_REQUEST', updateSubCategorySaga);
  // yield takeEvery('DELETE_SUB_CATEGORY_REQUEST', deleteSubCategorySaga);
}
