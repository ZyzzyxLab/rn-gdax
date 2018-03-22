import _ from 'lodash';
import { groupBy } from 'lodash';
import { createSelector } from 'reselect';
import { STORE_KEY } from './types';

const hydrate = getState => _.isFunction(getState) ? getState() : getState;

export const selectProductsState = state => hydrate(state[STORE_KEY]);

export const selectProductsLoading = state => selectProductsState(state).fetching;

export const selectProductList = state => selectProductsState(state).list;

const selectCurrentProductId = state => selectProductsState(state).currentProductId;

export const selectCurrentProduct = createSelector(
  selectProductList,
  selectCurrentProductId,
  (list, id) => list[id],
);

export const selectCurrencies = createSelector(
  selectProductList,
  products => groupBy(products, 'base_currency'),
);
