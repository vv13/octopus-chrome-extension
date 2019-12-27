import { wrapStore } from 'webext-redux';
import { configureApp, createReduxStore } from './AppConfig';

const store = createReduxStore();

configureApp(store);
wrapStore(store);
