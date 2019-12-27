import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../../store';
import { IBookmark } from '../../store/bookmark/reducer';
// import { getBookmark } from '../store/bookmark/actions';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const bookmark = useSelector<IAppState, IBookmark>(state => state.bookmark);
  React.useEffect(() => {
    dispatch({
      type: 'bookmark/FETCH_BOOKMARK',
    });
  }, []);
  return (
    <div className="App">
      <h1>hello world</h1>
      <textarea name="" id="">
        {JSON.stringify(bookmark)}
      </textarea>
      <div></div>
    </div>
  );
};

export default App;
