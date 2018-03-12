import * as types from './types';
import * as actions from './actions';
import sampleProducts from './__sample_products__.json';

describe('products actions', () => {
  it('should create an action to fetch products', () => {
    // Assemble
    const expected = {
      type: types.PRODUCTS_FETCH,
      payload: {},
    };
    // Act
    const actual = actions.fetchProducts();
    // Assert
    expect(actual).toEqual(expected);
  });

  it('should create an action with a list of products', () => {
    // Assemble
    const expected = {
      type: types.PRODUCTS_LIST,
      payload: {
        products: sampleProducts,
      },
    };
    // Act
    const actual = actions.productsList(sampleProducts);
    // Assert
    expect(actual).toEqual(expected);
  });

  it('should create an action for a product error', () => {
    // Assemble
    const expectedError = {
      message: 'An error for your test',
    };
    const expected = {
      type: types.PRODUCTS_ERROR,
      payload: {
        error: expectedError,
      },
      error: true,
    };
    // Act
    const actual = actions.productsError(expectedError);
    // Assert
    expect(actual).toEqual(expected);
  });

  it('should create an action to select a product', () => {
    // Assemble
    const expectedProductSelection = { id: sampleProducts[0].id };
    const expected = {
      type: types.PRODUCT_SELECT,
      payload: expectedProductSelection,
    };
    // Act
    const actual = actions.selectProduct(expectedProductSelection.id);
    // Assert
    expect(actual).toEqual(expected);
  });
})
