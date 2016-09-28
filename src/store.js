import { createEpicMiddleware } from 'redux-observable';

import { createStore, compose, applyMiddleware } from 'redux';

import { Reducers, Epics } from './reducers';

import DevTools from './middlewares/DevTools';
import Logger   from './middlewares/Logger';

import devTools from 'remote-redux-devtools';

const rootReducer = Reducers;


const epicMiddleware = createEpicMiddleware(Epics);

const enhancer = compose(
  applyMiddleware(epicMiddleware),
  applyMiddleware(Logger),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools,
);

const configureStore = () => {
  const store = createStore(rootReducer, enhancer);

  if (module.hot) {
    module.hot.accept(
      './reducers',
      () => {
        const nextReducer = Reducers;
        store.replaceReducer(nextReducer);
      }
    );
  }

  return store;
};

const store = configureStore(window.__INITIAL_STATE__ || {});

// It's use for apply all other middleware (e.g. redux-observable) to the devtools
devTools.updateStore(store);

export default store;
