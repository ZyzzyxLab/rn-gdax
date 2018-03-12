import debug from 'debug';
// import fetch from 'fetch-everywhere';

const log = debug('rn-gdax:api:request');

const request = async (url, options) => {
  log('requesting...', { url, options });
  const response = await fetch(url, options);
  log('response', { url, response });
  log('content-length:', response.headers.get('content-length'));
  log('content-type:', response.headers.get('content-type'));

  let hasBody = true;

  if (response.headers.has('content-length')
    && Number(response.headers.get('content-length')) <= 0) {
    hasBody = false;
  }

  const contentType = response.headers.get('content-type');

  let body = null;
  if (hasBody) {
    body = contentType.indexOf('application/json') > -1
      ? response.json()
      : response.text();
  }

  if (response.status >= 400) {
    const errorMsg = body.message || `Response error: ${url} resulted in ${response.status}`;
    throw new Error(errorMsg);
  }

  return body;
};

export default request;
