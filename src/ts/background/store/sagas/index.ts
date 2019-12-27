import { all, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { chromeBookmarkGetTree } from '../../../utils/chrome-api';
import * as bookmarkActions from '../bookmark/actions';

export const rootSaga = function*() {
  yield all([
    takeEvery(getType(bookmarkActions.getBookmark), function*() {
      const data = yield chromeBookmarkGetTree();
      yield put(bookmarkActions.setBookmark(data));
    }),
  ]);
};
