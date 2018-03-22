import * as types from './types';

export const fetchProducts = () => ({
  type: types.PRODUCTS_FETCH,
  payload: {},
});

export const productsList = products => ({
  type: types.PRODUCTS_LIST,
  payload: { products },
});

export const productsError = error => ({
  type: types.PRODUCTS_ERROR,
  payload: { error },
  error: true,
});

export const selectProduct = id => {
  console.log(`called ${types.PRODUCT_SELECT} with id:`, id);
return ({
  type: types.PRODUCT_SELECT,
  payload: { id },
});
};

export const clearPrices = () => ({
  type: types.PRODUCT_CLEAR_PRICES,
  payload: {},
});

export const productPrice = data => ({
  type: types.PRODUCT_PRICE,
  payload: data,
});
