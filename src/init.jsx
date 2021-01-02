import Cookies from 'js-cookie';
import faker from 'faker';
import React from 'react';
import { Provider } from 'react-redux';
import createStore from './store';
import UserContext from './contexts/UserContext';
import {
  channelAdded,
  channelRenamed,
  channelRemoved,
} from './components/channels/channelsSlice';
import {
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

const makeNormalizedState = (initialState) => ({
  channels: {
    ids: initialState.channels.map((channel) => channel.id),
    entities: initialState.channels.reduce(
      (acc, channel) => ({ ...acc, [channel.id]: { ...channel } }),
      {},
    ),
    currentChannelId: initialState.currentChannelId,
    defaultChannelId: initialState.channels.find((channel) => channel.name === 'general').id || 1,
  },
  messages: {
    ids: initialState.messages.map((message) => message.id),
    entities: initialState.messages.reduce(
      (acc, message) => ({ ...acc, [message.id]: { ...message } }),
      {},
    ),
  },
});

const init = (initialState, appOptions = {}) => {
  init18n();
  const { socket } = appOptions;
  const preloadedState = makeNormalizedState(initialState);
  const store = createStore(preloadedState);
  setupSocketMessagesHandlers(socket, store);
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
