import { all } from 'redux-saga/effects';
import * as products from './products';

const reducers = {
  [products.STORE_KEY]: products.reducers,
};

const sagas = [];
sagas.push(products.sagas);

// function* rootSaga() {
//   yield all(sagas.map(s => s()));
// }

export default reducers;

export { sagas };
