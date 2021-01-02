import Cookies from 'js-cookie';
import faker from 'faker';
import React from 'react';
import { Provider } from 'react-redux';
import createStore from './store';
import UserContext from './contexts/UserContext';
import {
  initCurrentChannel,
  initChannels,
  channelAdded,
  channelRenamed,
  channelRemoved,
} from './components/channels/channelsSlice';
import {
  initMessages,
  messageDelivered,
} from './components/messages/messagesSlice';
import init18n from './i18n/i18n';
import App from './App';

const getRandomUsername = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  return `${firstName} ${lastName}`;
};

const setCookieIfNotExist = (cookieName, value) => {
  if (!Cookies.get(cookieName)) {
    Cookies.set(cookieName, value);
  }
};

const setupSocketMessagesHandlers = (socket, store) => {
  socket.on('connect', () => {
    socket.on('newMessage', ({ data: { attributes } }) => {
      store.dispatch(messageDelivered(attributes));
    });
    socket.on('newChannel', ({ data: { attributes } }) => {
      store.dispatch(channelAdded(attributes));
    });
    socket.on('renameChannel', ({ data: { attributes } }) => {
      store.dispatch(channelRenamed(attributes));
    });
    socket.on('removeChannel', ({ data: { id } }) => {
      store.dispatch(channelRemoved({ id }));
    });
  });
};

const init = (initialState, appOptions = {}) => {
  init18n();
  const { socket } = appOptions;
  const store = createStore();
  setupSocketMessagesHandlers(socket, store);

  store.dispatch(initCurrentChannel({ currentChannelId: initialState.currentChannelId }));
  store.dispatch(initChannels(initialState.channels));
  store.dispatch(initMessages(initialState.messages));

  setCookieIfNotExist('username', appOptions.username || getRandomUsername());
  const username = Cookies.get('username');

  return (
    <Provider store={store}>
      <UserContext.Provider value={username}>
        <App />
      </UserContext.Provider>
    </Provider>
  );
};

export default init;
