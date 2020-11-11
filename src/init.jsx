import Cookies from 'js-cookie';
import faker from 'faker';
import React from 'react';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import createStore from './store';
import createSocketMiddleware from './middlewares/websocket';
import UserContext from './contexts/UserContext';

const getRandomUsername = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  return `${firstName} ${lastName}`;
};

const setCookieIfNotExist = (cookieName, value) => {
  if (typeof (Cookies.get(cookieName)) === 'undefined') {
    Cookies.set(cookieName, value);
  }
};

const init = (component, initialState, appOptions = {}) => {
  const socket = appOptions.socket || io();
  const middlewares = [createSocketMiddleware(socket)];
  const store = createStore(initialState, middlewares);
  const username = getRandomUsername();
  setCookieIfNotExist('username', username);

  return (
    <Provider store={store}>
      <UserContext.Provider value={username}>
        {component}
      </UserContext.Provider>
    </Provider>
  );
};

export default init;