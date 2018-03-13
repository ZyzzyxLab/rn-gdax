import configureStore from './configure';
import * as productActions from './products/actions';
import * as selectors from './products/selectors';

describe('redux store', () => {
  it('should be able to dispatch fetch products', () => {
    // Assemble
    const uut = configureStore();
    expect.assertions(1);
    // Act
    const actual = uut.dispatch(productActions.fetchProducts());
    // Assert
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const state = uut.getState();
        const products = selectors.selectProductList(state);
        console.log('products:', products);
        resolve(expect(products).toBeDefined());
      }, 1000);
    })
  })
})
