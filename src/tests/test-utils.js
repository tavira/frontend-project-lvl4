import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import createStore from '../store';


function render(ui, { initialState = {}, ...renderOptions } = {}) {
  const store = createStore(initialState);
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    // eslint-disable-next-line react/jsx-filename-extension
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';

export { render };
