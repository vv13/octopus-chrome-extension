import { ActionType, createReducer } from 'typesafe-actions';
import { ChromeBookmark } from '../../utils/chrome-api';
import { actions } from './actions';

export type BookmarkAction = ActionType<typeof actions>;
export interface IBookmark {
  bookmark: ChromeBookmark[];
}

const initialState: IBookmark = {
  bookmark: [],
};

const bookmark = createReducer<IBookmark, BookmarkAction>(
  initialState,
).handleAction(actions.setBookmark, (state, action) => {
  return { ...state, bookmark: action.payload };
});

export default bookmark;
