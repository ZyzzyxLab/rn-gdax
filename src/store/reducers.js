import { all, fork } from 'redux-saga/effects';
import * as products from './products';

const reducers = {
  [products.STORE_KEY]: products.reducers,
};

const sagas = [];
sagas.push(products.sagas);

export { sagas };

function* rootSaga() {
  yield all(sagas.map(s => fork(s)));
}

export default reducers;

export { rootSaga };
