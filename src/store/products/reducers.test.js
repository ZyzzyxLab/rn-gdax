import * as types from './types';
import reducer from './reducers';
import sampleProducts from './__sample_products__.json';
import products from './__products__.json';

const EXPECTED_INITIAL_STATE = {
  list: {},
  fetching: false,
  currentProductId: null,
  loadingError: null,
};

describe('products reducer', () => {
  it('should handle initialization', () => {
    // Assemble
    const state = void(0);
    const action = {};
    const expected = EXPECTED_INITIAL_STATE;
    // Act
    const actual = reducer(state, action);
    // Assert
    expect(actual).toEqual(expected);
  });

  it(`should handle ${types.PRODUCTS_FETCH}`, () => {
    // Assemble
    const state = EXPECTED_INITIAL_STATE;
    const action = {
      type: types.PRODUCTS_FETCH,
    };
    const expected = Object.assign({},
      EXPECTED_INITIAL_STATE, {
        fetching: true,
      },
    );
    // Act
    const actual = reducer(state, action);
    // Assert
    expect(actual).toEqual(expected);
  });

  it(`should handle ${types.PRODUCTS_LIST}`, () => {
    // Assemble
    const state = Object.assign({},
      EXPECTED_INITIAL_STATE, {
        fetching: true,
      },
    );
    const payload = { products: sampleProducts };
    const action = {
      type: types.PRODUCTS_LIST,
      payload,
    };
    const expected = Object.assign({},
      EXPECTED_INITIAL_STATE, {
        list: products,
      },
    );
    // Act
    const actual = reducer(state, action);
    // Assert
    expect(actual).toEqual(expected);
  });

  it(`should handle ${types.PRODUCTS_ERROR}`, () => {
    // Assemble
    const state = Object.assign({},
      EXPECTED_INITIAL_STATE, {
        fetching: true,
      },
    );
    const error = {
      message: 'Error occurred for testing',
    };
    const action = {
      type: types.PRODUCTS_ERROR,
      payload: { error },
      error: true,
    };
    const expected = Object.assign({},
      EXPECTED_INITIAL_STATE, {
        loadingError: error,
      },
    );
    // Act
    const actual = reducer(state, action);
    // Assert
    expect(actual).toEqual(expected);
  });

  it(`should handle ${types.PRODUCT_SELECT}`, () => {
    // Assemble
    const state = Object.assign({},
      EXPECTED_INITIAL_STATE, {
        list: products,
      },
    );
    const productId = sampleProducts[0].id;
    const productSelection = { id: productId };
    const action = {
      type: types.PRODUCT_SELECT,
      payload: productSelection,
    };
    const expected = Object.assign({},
      EXPECTED_INITIAL_STATE, {
        list: products,
        currentProductId: productId,
      },
    );
    // Act
    const actual = reducer(state, action);
    // Assert
    expect(actual).toEqual(expected);
  });
});
