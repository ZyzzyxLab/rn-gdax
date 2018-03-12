import * as types from './types';

const fetchProducts = () => ({
  type: types.PRODUCTS_FETCH,
  payload: {},
});

export { fetchProducts };

const productsList = products => ({
  type: types.PRODUCTS_LIST,
  payload: { products },
});

export { productsList };

const productsError = error => ({
  type: types.PRODUCTS_ERROR,
  payload: { error },
  error: true,
});

export { productsError };

const selectProduct = id => ({
  type: types.PRODUCT_SELECT,
  payload: { id },
});

export { selectProduct };
