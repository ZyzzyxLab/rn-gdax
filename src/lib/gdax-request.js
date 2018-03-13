import debug from 'debug';

import request from './request';

const log = debug('rn-gdax:api:gdax-request');

// TODO: refactor to global/env/config
// const API_SUCCESS = 'success';
const API_PROTOCOL = 'https';
const API_HOST = 'api.gdax.com';
const API_PATH = '';
const API_VERSION = '/'; // TODO: should make use of versioning path
// const TOKEN_COOKIE_NAME = 'session';

const buildApiUrl = endpoint => (process.env.IS_BROWSER ? `${API_PATH}${API_VERSION}${endpoint}`
  : `${API_PROTOCOL}://${API_HOST}${API_VERSION}${endpoint}`);

const alwaysSendOptions = {
  // credentials: 'include',
};

const SET_HEADERS = {
  'content-type': 'application/json',
};

const apiRequester = /*({ token }) =>*/ (endpoint, options = {}) =>
  new Promise(async (resolve, reject) => {
    log('making call using:', { endpoint, options });
    const headersToSend = new Headers();
    const { headers, ...otherOpts } = options;
    Object.entries(SET_HEADERS).forEach(([h, v]) => {
      headersToSend.set(h, v);
    });
    let url = '';
    try {
      url = buildApiUrl(endpoint);

      if (headers) {
        Object.entries(headers).forEach(([h, v]) => {
          if (SET_HEADERS[h.toLowerCase()]) {
            headersToSend.set(h, v);
          } else {
            headersToSend.append(h, v);
          }
        });
      }
      // // this line prevents this code from making it into the client via webpack define
      // if (!process.env.IS_BROWSER) {
      //   if (token) {
      //     headersToSend.append('Cookie', `${TOKEN_COOKIE_NAME}=${token}`);
      //   }
      // }
      const sendOptions = {
        ...alwaysSendOptions,
        ...otherOpts,
      };
      if (sendOptions.body) {
        sendOptions.body = JSON.stringify(sendOptions.body);
      }
      sendOptions.headers = headersToSend;
      log('sending with headers:', headersToSend);

      const response = await request(url, sendOptions);

      if (!response) {
        return reject({
          status: 'failed',
          message: `Request to ${endpoint} did not include 'response'`,
          meta: {
            fullUrl: url,
          },
        });
      }

      // if (API_SUCCESS !== response.status) {
      //   return reject({
      //     status: response.status || 'failed',
      //     message: response.message || `Request to ${endpoint} did not include 'response.message'`,
      //     meta: {
      //       fullUrl: url,
      //     },
      //   });
      // }

      return resolve(response);
    } catch (reqError) {
      const { name, message, stack } = reqError;
      return reject({
        status: 'error',
        message,
        meta: {
          fullUrl: url,
          name,
          stack,
        },
      });
    }
  },
);

export default apiRequester;
