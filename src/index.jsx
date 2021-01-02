// @ts-check

// import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import io from 'socket.io-client';

import '../assets/application.scss';

import gon from 'gon';
import init from './init';
import initRollbar from './rollbar';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
if (process.env.NODE_ENV === 'production') {
  initRollbar();
}

const App = init(gon, { socket: io() });
ReactDOM.render(
  App,
  document.getElementById('chat'),
);
