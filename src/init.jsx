import Cookies from 'js-cookie';
import faker from 'faker';
import React from 'react';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import createStore from './store';
import createSocketMiddleware from './middlewares/websocket';
import UserContext from './contexts/UserContext';
import { initCurrentChannel, initChannels } from './components/channels/channelsSlice';
import { initMessages } from './components/messages/messagesSlice';
import init18n from './i18n/i18n';

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

const init = (component, initialState, appOptions = {}) => {
  init18n();
  const socket = appOptions.socket || io();
  const middlewares = [createSocketMiddleware(socket)];
  const store = createStore(middlewares);

  store.dispatch(initCurrentChannel({ currentChannelId: initialState.currentChannelId }));
  store.dispatch(initChannels(initialState.channels));
  store.dispatch(initMessages(initialState.messages));

  setCookieIfNotExist('username', appOptions.username || getRandomUsername());
  const username = Cookies.get('username');

  return (
    <Provider store={store}>
      <UserContext.Provider value={username}>
        {component}
      </UserContext.Provider>
    </Provider>
  );
};

export default init;
