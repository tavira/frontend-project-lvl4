import Cookies from 'js-cookie';
import faker from 'faker';
import createStore from './store';
import render from './App';

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

const init = (initialState) => {
  const store = createStore(initialState);
  const username = getRandomUsername();
  setCookieIfNotExist('username', username);
  render(store, username);
};

export default init;
