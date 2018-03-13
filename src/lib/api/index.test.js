import * as api from './index';

describe('api', () => {
  it('should fetch products', async () => {
    // Assemble
    expect.assertions(2);
    // Act
    const actual = await api.getProducts();
    // Assert
    expect(actual).toBeTruthy();
    expect(actual).not.toHaveLength(0);
  });
})
