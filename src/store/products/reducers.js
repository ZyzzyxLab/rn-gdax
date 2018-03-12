import { isNil } from 'lodash';
import * as types from './types';

const INITIAL_STATE = {
  list: {},
  fetching: false,
  currentProductId: null,
  loadingError: null,
};

const HANDLERS = {};

HANDLERS[types.PRODUCTS_FETCH] = state => ({
  ...state,
  fetching: true,
  loadingError: null,
});

HANDLERS[types.PRODUCTS_LIST] = (state, { payload }) => {
  const { products } = payload;
  const list = isNil(products) ? {} :
    products.reduce((accum, p) => {
      accum[p.id] = p;
      return accum;
    }, {});

  return {
    ...state,
    fetching: false,
    list,
    loadingError: null,
  };
};

HANDLERS[types.PRODUCTS_ERROR] = (state, { payload, error }) => {
  if (!error) {
    return state;
  }
  return {
    ...state,
    fetching: false,
    loadingError: payload.error,
  };
};

HANDLERS[types.PRODUCT_SELECT] = (state, { payload }) => ({
  ...state,
  currentProductId: payload.id,
});

export default function reducer (state = INITIAL_STATE, action) {
  if (isNil(action)) {
    return state;
  }
  const handler = HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
