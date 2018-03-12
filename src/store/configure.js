import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import applyAppStateListener from 'redux-enhancer-react-native-appstate';

import reducers, { sagas } from './reducers';

export default function configureStore (initialState) {
  const rootReducer = combineReducers({
    ...reducers,
  });

  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    sagaMiddleware,
  ];
  const appliedMiddleware = applyMiddleware(...middlewares);

  const enhancers = compose(
    applyAppStateListener(),
    appliedMiddleware,
  );

  const store = createStore(rootReducer, initialState, enhancers);

  sagaMiddleware.run(sagas[0]);

  return store;
}
