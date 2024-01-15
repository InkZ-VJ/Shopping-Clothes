import { takeLatest, call, put, all } from 'redux-saga/effects';

import { getCategoriesAndDocuMents } from '../../utils/firebase/firbase.utils';

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from './categories.action';

import { CATEGORIES_ACTION_TYPES } from './categories.types';

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuMents, 'categories');
    yield put(fetchCategoriesSuccess(categoriesArray)); //dispatch => putt
  } catch (error) {
    yield put(fetchCategoriesFailure(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}