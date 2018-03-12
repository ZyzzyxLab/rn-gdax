import gdaxRequest from '../gdax-request';

// TODO: refactor into other files

export const getProducts = () => gdaxRequest('products');
