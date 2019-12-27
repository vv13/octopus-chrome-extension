import { applyMiddleware, compose, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducers, { IAppState, loadState, saveState } from '../store';
import { rootSaga } from '../store/sagas';

const sagaMiddleware = createSagaMiddleware();
const autoSaveAppState = (store: Store<IAppState>) => {
  chrome.tabs.onRemoved.addListener(() => saveState(store.getState()));
  chrome.windows.onRemoved.addListener(() => saveState(store.getState()));
  const saveFrequency = 30000; // 30seconds * 1000milliseconds / 1second
  setInterval(() => saveState(store.getState()), saveFrequency);
};

export const configureApp = (store: Store<IAppState>) => {
  autoSaveAppState(store);
};

export const createReduxStore = () => {
  const middlewares = [];
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(
      createLogger({
        collapsed: true,
        duration: true,
      }),
    );
  }
  middlewares.push(sagaMiddleware);
  const enhancer = compose(applyMiddleware(...middlewares));
  const preloadedState = loadState();
  const store = createStore(reducers, preloadedState, enhancer);
  sagaMiddleware.run(rootSaga);

  return store;
};
