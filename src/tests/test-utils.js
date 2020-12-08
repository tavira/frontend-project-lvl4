import { render as rtlRender } from '@testing-library/react';
import init from '../init';

function render(ui, { initialState = {}, appOptions, ...renderOptions } = {}) {
  const wrappedUI = init(ui, initialState, appOptions);
  return rtlRender(wrappedUI, { ...renderOptions });
}

export * from '@testing-library/react';

export { render };
