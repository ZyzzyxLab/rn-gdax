import {
  all,
  apply,
  call,
  cancel,
  cancelled,
  fork,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
// import { PublicClient } from 'gdax';
import * as api from '../../lib/api';
import * as types from './types';
import * as actions from './actions';
import * as selectors from './selectors';
import createSocket, { GDAX_PRODUCT_FEED } from '../../lib/gdax-ws';
import createSocketChannel from '../../lib/ws-channel';

// const gdaxClient = new PublicClient();

const log = console;

function* fetchProducts(action) {
  try {
    // const products = yield call(gdaxClient.getProducts);
    const products = yield call(api.getProducts);
    yield put(actions.productsList(products));
  }
  catch (err) {
    yield put(actions.productsError(err));
  }
}

export { fetchProducts };

function* selectProduct(gdaxWs) {
  const initialProduct = yield select(selectors.selectCurrentProduct);
  let currendProductId = initialProduct ? initialProduct.id : '';
  while (true) {
    let action = yield take(types.PRODUCT_SELECT);
    let currentProduct = yield select(selectors.selectCurrentProduct);
    if (currentProduct.id !== currendProductId) {
      if (currendProductId) {
        yield apply(gdaxWs, gdaxWs.unsubscribe);
        log.log('unsubscribe done');
      }
      yield put(actions.clearPrices());
      try {
        yield apply(gdaxWs, gdaxWs.subscribeToProduct, [currentProduct]);
        currendProductId = currentProduct.id;
      }
      catch (err) {
        log.error('error trying to subscribe:', err);
        yield put(actions.productsError(err));
      }
    }
  }
}

function* watchProductChannel() {
  const gdaxWs = yield call(createSocket);
  // const proxy = yield call(handleMessages, {
  //   ondata: (type, payload) => void(0),
  //   onerror: err => log.error('socket error'. err),
  // });
  const channel = yield call(createSocketChannel, gdaxWs, GDAX_PRODUCT_FEED);
  const selProdTask = yield fork(selectProduct, gdaxWs);
  try {
    while (true) {
      let data = yield take(channel);
      if (data.error) {
        yield put(actions.productsError(data.error));
      }
      else {
        yield put(actions.productPrice(data));
      }
    }
  }
  finally {
    if (yield cancelled()) {
      log.info('GDAX feed was cancelled!');
      gdaxWs.close();
    }
    log.info('GDAX WS channel ended');
  }

  // while (true) {
  //   const chooseProduct = yield take(types.PRODUCT_SELECT);
  //   yield call(proxy.send, )

  //   const payload = yield take(channel);
  //   if (payload.error) {
  //     log.error('WebSocket error:', payload.message);
  //   }
  //   else {
  //     yield put(actions.)
  //   }
  // }
  // yield takeEvery(types.PRODUCT_SELECT, selectProduct);
}

function* productsSaga() {
  yield all([
    takeLatest(types.PRODUCTS_FETCH, fetchProducts),
    fork(watchProductChannel)
  ]);
}

export default productsSaga;
