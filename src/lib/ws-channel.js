import { take, put, call, apply } from 'redux-saga/effects';
import { eventChannel, END, delay } from 'redux-saga';

const createSocketChannel = (socket, ...events) => eventChannel(emit => {
  if (!events.length) {
    return;
  }

  events.forEach(ev => socket.on(ev, data => emit(data)));
  socket.on('error', err => console.error('WS error:', err) & emit({ error: err }));

  return () => {
    events.forEach(ev => socket.off(ev));
    socket.off('error');
    // socket.close();
  }
})

export default createSocketChannel;
