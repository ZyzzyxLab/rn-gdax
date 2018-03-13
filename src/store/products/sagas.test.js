import { call, put } from 'redux-saga/effects';
import * as types from './types';
import * as api from '../../lib/api';
import uut, * as sagas from './sagas';

describe('products saga', () => {
  it('it should wait for a request to fetch products', () => {
    // Assemble
    const returnProducts = [];
    const expectedCall = call(api.getProducts, 0);
    const expectedResult = put({
      type: types.PRODUCTS_LIST,
      payload: { products: returnProducts },
    });
    // Act
    const iterator = sagas.fetchProducts();
    const actualCall = iterator.next().value;
    const actualResult = iterator.next(returnProducts).value;
    // Assert
    expect(actualCall).toEqual(expectedCall);
    expect(actualResult).toEqual(expectedResult);
  });

});
