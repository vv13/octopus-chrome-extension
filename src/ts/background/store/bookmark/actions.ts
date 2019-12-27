import { createAction } from 'typesafe-actions';
import { ChromeBookmark } from '../../../utils/chrome-api';
import actionTypes from '../constants';

export const getBookmark = createAction(actionTypes.FETCH_BOOKMARKS)();
export const setBookmark = createAction(actionTypes.SET_BOOKMARKS)<ChromeBookmark[]>();

export const actions = {
  getBookmark,
  setBookmark,
};
