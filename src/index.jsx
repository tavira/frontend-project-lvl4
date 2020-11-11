// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

import gon from 'gon';
import init from './init';
import App from './App';


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const WrappedComponent = init(<App />, gon);
ReactDOM.render(
  WrappedComponent,
  document.getElementById('chat'),
);
