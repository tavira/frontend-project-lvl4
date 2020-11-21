import React from 'react';
import {
  fireEvent, screen, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import axios from 'axios';
import { render } from '../../tests/test-utils';
import EditedMessage from './index';
import routes from '../../routes';
import UserContext from '../../contexts/UserContext';


const server = setupServer(
  rest.post(routes.channelMessagesPath(':id'), (req, res, ctx) => res(ctx.json({
    data: {
      type: 'messages',
      id: 10,
      attributes: {
        message: 'message text',
        channelId: req.params.id,
        id: 10,
      },
    },
  }))),
);

beforeAll(() => {
  server.listen({
    onUnhandledRequest(req) {
      console.error(
        'Found an unhandled %s request to %s',
        req.method,
        req.url.href,
      );
    },
  });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

describe('test chat message sending', () => {
  test('should send message data: text, author, channel id', async () => {
    const spy = jest.spyOn(axios, 'post');

    const message = 'hello';
    const username = 'author name';
    const initialState = { currentChannelId: 1, channels: [], messages: [] };
    const expectedPath = routes.channelMessagesPath(initialState.currentChannelId);
    const expectedRequestData = { data: { attributes: { message, username } } };

    const component = (
      <UserContext.Provider value={username}>
        <EditedMessage />
      </UserContext.Provider>
    );
    const { findByRole } = render(component, { initialState });
    const element = await findByRole('textbox');
    await userEvent.type(element, message);
    const form = await screen.findByTestId('messageForm');
    fireEvent.submit(form);
    await waitFor(async () => {
      expect(spy).toHaveBeenCalledWith(expectedPath, expectedRequestData);
    });

    spy.mockRestore();
  });

  test('textbox should be empty after message sending', async () => {
    const initialState = { currentChannelId: 1, channels: [], messages: [] };

    const { findByRole } = render(<EditedMessage />, { initialState });
    const element = await findByRole('textbox');
    await userEvent.type(element, 'some text');
    const form = await screen.findByTestId('messageForm');
    fireEvent.submit(form);

    await waitFor(async () => {
      const textbox = await findByRole('textbox');
      expect(textbox).toHaveValue('');
    });
  });

  test('component should show errors if they returned', async () => {
    server.use(
      rest.post('http://localhost/api/v1/channels/:id/messages', (req, res, ctx) => res.once(
        ctx.status(500),
      )),
    );
    const initialState = { currentChannelId: 1, channels: [], messages: [] };
    const { findByRole, container } = render(<EditedMessage />, { initialState });
    const element = await findByRole('textbox');
    await userEvent.type(element, 'hello');
    const form = await screen.findByTestId('messageForm');
    fireEvent.submit(form);

    await waitFor(async () => {
      const messageElement = container.querySelector('div');
      expect(messageElement).toHaveTextContent('Request failed with status code 500');
    });
  });
});
