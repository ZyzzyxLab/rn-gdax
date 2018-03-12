import * as uut from './selectors';
import samples from './__sample_products__.json';
import products from './__products__.json';
import currencies from './__currencies__.json';

const EXPECTED_INITIAL_PRODUCTS_STATE = {
  list: {},
  fetching: false,
  currentProductId: null,
  loadingError: null,
};

describe('product selectors', () => {
  it('should select products data from store', () => {
    // Assemble
    const state = {
      products: EXPECTED_INITIAL_PRODUCTS_STATE,
    };
    const expected = EXPECTED_INITIAL_PRODUCTS_STATE;
    // Act
    const actual = uut.selectProductsState(state);
    // Assert
    expect(actual).toEqual(expected);
  });

  it('should select products loading store', () => {
    // Assemble
    const state = {
      products: EXPECTED_INITIAL_PRODUCTS_STATE,
    };
    const expected = EXPECTED_INITIAL_PRODUCTS_STATE.fetching;
    // Act
    const actual = uut.selectProductsLoading(state);
    // Assert
    expect(actual).toEqual(expected);
  });

  it('should select products list from store', () => {
    // Assemble
    const productsState = Object.assign({},
      EXPECTED_INITIAL_PRODUCTS_STATE, {
        list: products,
      },
    );
    const state = {
      products: productsState,
    };
    const expected = products;
    // Act
    const actual = uut.selectProductList(state);
    // Assert
    expect(actual).toEqual(expected);
  });

  it('should select current product object from store', () => {
    // Assemble
    const expectedProduct = samples[0];
    const productId = expectedProduct.id;
    const productsState = Object.assign({},
      EXPECTED_INITIAL_PRODUCTS_STATE, {
        list: products,
        currentProductId: productId,
      },
    );
    const state = {
      products: productsState,
    };
    const expected = expectedProduct;
    // Act
    const actual = uut.selectCurrentProduct(state);
    // Assert
    expect(actual).toEqual(expected);
  });

  it('should select products by currency from store', () => {
    // Assemble
    const productsState = Object.assign({},
      EXPECTED_INITIAL_PRODUCTS_STATE, {
        list: products,
      },
    );
    const state = {
      products: productsState,
    };
    const expected = currencies;
    // Act
    const actual = uut.selectCurrencies(state);
    // Assert
    expect(actual).toEqual(expected);
  });

});
