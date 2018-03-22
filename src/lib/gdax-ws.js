import EventEmitter from 'events';
import { partial } from 'lodash';

const log = console;

const GDAX_DEFAULT_HOST = 'ws-feed.gdax.com';
const GDAX_ERROR_TYPE = 'error';
const CONNECTING = 'CONNECTING';
const OPEN = 'OPEN';
const GDAX_SUBSCRIBE = 'subscribe';
const GDAX_UNSUBSCRIBE = 'unsubscribe';
export const GDAX_PRODUCT_FEED = 'ticker';

const send = (socket, msg) => {
  const json = JSON.stringify(msg);
  socket.send(json);
}

export class GdaxWebsocket extends EventEmitter {
  constructor(host = GDAX_DEFAULT_HOST) {
    super();

    const socket = new WebSocket(`wss://${host}`);

    socket.onmessage = (event) => {
      const { data } = event;
      try {
        const { type, ...payload } = JSON.parse(data);
        if (type === GDAX_ERROR_TYPE) {
          this.emit('error', payload);
        }
        else {
          this.emit(type, payload);
        }
      }
      catch (error) {
        this.emit('error', error);
      }
    };
    socket.onerror = (error) => this.emit('error', error);
    socket.onclose = () => log.log('WS connection closed');
    this._socket = socket;
  }

  waitOnConnect(openTimeoutMs = 0) {
    return new Promise((resolve, reject) => {
      let openTO = null;
      if (openTimeoutMs > 0) {
        openTO = setTimeout(
          reject({ message: `websocket failed to open in ${openTimeoutMs} ms` }),
          openTimeoutMs
        );
      }
      this._socket.onopen = ev => {
        if (openTO) {
          clearTimeout(openTO);
        }
        resolve(this);
      };
    });
  }

  subscribeToProduct({ id }) {
    if (!id) {
      throw new Error(`no 'id' provided for subscribing to the product ${GDAX_PRODUCT_FEED}`);
    }
    try {
      send(this._socket, {
        type: GDAX_SUBSCRIBE,
        product_ids: [id],
        channels: [GDAX_PRODUCT_FEED]
      });
    }
    catch (err) {
      this.emit('error', err);
    }
  };

  unsubscribe() {
    try {
      send(this._socket, {
        type: GDAX_UNSUBSCRIBE,
        channels: [GDAX_PRODUCT_FEED],
      });
    }
    catch (err) {
      this.emit('error', err);
    }
  };

  close() {
    this._socket.close();
  }
}

//   const proxy = {
//     subscribe: ({ id }) => {
//       try {
//         subscribeToProduct(socket, { id });
//       }
//       catch (error) {
//         onerror(error);
//       }
//     },
//     unsubscribe: () => {
//       try {
//         unsubscribe(socket);
//       }
//       catch (error) {
//         onerror(error);
//       }
//     },
//     close: socket.close,
//   };
//   if (socket.readyState === OPEN) {
//     return Promise.resolve(proxy);
//   }
//   return new Promise((resolve, reject) => {
//     let openTO = null;
//     if (openTimeout > 0) {
//       openTO = setTimeout(
//         reject({ message: `websocket failed to open in ${openTimeout} ms` }),
//         openTimeout
//       );
//     }
//     socket.onopen(ev => {
//       if (openTO) {
//         clearTimeout(openTO);
//       }
//       resolve(proxy);
//     });
//   });
// }

const createSocket = async (host, connectWaitTimeout) => {
  const ws = new GdaxWebsocket(host);
  await ws.waitOnConnect(connectWaitTimeout);
  return ws;
}

export default createSocket;
