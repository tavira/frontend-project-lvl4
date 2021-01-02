import { render as rtlRender } from '@testing-library/react';
import init from '../init';

function render(ui, { initialState = {}, appOptions, ...renderOptions } = {}) {
  const app = init(initialState, appOptions);
  return rtlRender(app, { ...renderOptions });
}

export * from '@testing-library/react';

export { render };
