import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../background/store';
import { IBookmark } from '../background/store/bookmark/reducer';
// import { getBookmark } from '../background/store/bookmark/actions';

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
      <textarea name="" id="" cols="100" rows="100">
        {JSON.stringify(bookmark)}
      </textarea>
      <div></div>
    </div>
  );
};

export default App;
