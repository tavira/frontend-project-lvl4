import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  findByText,
  screen,
  waitFor,
  queryByText,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import routes from '../../routes';
import SocketIoServer from '../../__mocks__/socket.io/socket.io-server';
import { render } from '../../tests/test-utils';
import App from '../../App';

let wsserver;
let wsclient;
let server;

beforeAll(() => {
  wsserver = new SocketIoServer();
  wsclient = wsserver.socketIoClient;

  server = setupServer(
    rest.post(routes.channelsPath(), ((req, res, context) => {
      const { name } = req.body.data.attributes;
      const attributes = { id: 2, name, removable: true };
      wsserver.emit('newChannel', { data: { attributes } });
      return res(
        context.status(201),
        context.json({
          data: {
            type: 'channels',
            id: attributes.id,
            attributes,
          },
        }),
      );
    })),

  );

  server.listen({
    onUnhandledRequest: 'error',
  });
});


describe('test channels', () => {
  describe('add channels', () => {
    const initialState = {
      currentChannelId: 1,
      channels: [{ id: 1, name: 'general', removable: false }],
      messages: [],
    };

    beforeEach(async () => {
      const appOptions = { socket: wsclient };
      await render(<App />, { initialState, appOptions });
      wsserver.emit('connect');
    });

    test('new channel should show in channels list', async () => {
      const channelNameToAdd = 'new_channel';

      await userEvent.click(await screen.findByText('Add channel'));
      await userEvent.type(await screen.findByRole('textbox'), channelNameToAdd);
      await userEvent.click(await screen.findByText('Save changes'));

      await waitFor(async () => {
        const channelsList = await screen.findByTestId('channels-list');
        expect(await findByText(channelsList, channelNameToAdd)).toBeInTheDocument();
      });
    });

    test('add channel input should have focus when it appears', async () => {
      await userEvent.click(await screen.findByText('Add channel'));

      expect(await screen.findByRole('textbox')).toHaveFocus();
    });

    test('app should have no way to add empty channel name', async () => {
      await userEvent.click(await screen.findByText('Add channel'));
      expect(queryByText(await screen.findByRole('dialog'), 'required')).not.toBeInTheDocument();

      await userEvent.type(await screen.findByRole('textbox'), 'a');
      await userEvent.type(await screen.findByRole('textbox'), '{backspace}');
      await waitFor(() => {
        expect(queryByText(screen.getByRole('dialog'), 'required')).toBeInTheDocument();
      });
    });

    test('app should show errors that occurred when channel is added', async () => {
      server.use(
        rest.post(routes.channelsPath(), (req, res, context) => res.once(
          context.status(500),
        )),
      );
      const expectedErrorText = 'Request failed with status code 500';

      await userEvent.click(await screen.findByText('Add channel'));
      await userEvent.type(await screen.findByRole('textbox'), 'a');
      await userEvent.click(await screen.findByText('Save changes'));
      await waitFor(() => {
        expect(queryByText(screen.getByRole('dialog'), expectedErrorText)).toBeInTheDocument();
      });
    });
  });

  describe('switch channels', () => {
    const initialState = {
      currentChannelId: 1,
      channels: [
        { id: 1, name: 'general', removable: false },
        { id: 2, name: 'another_channel', removable: true },
      ],
      messages: [
        {
          id: 1, username: 'user1', message: 'message_in_general', channelId: 1,
        },
        {
          id: 2, username: 'user1', message: 'message_in_another_channel', channelId: 2,
        },
      ],
    };

    beforeEach(async () => {
      const appOptions = { socket: wsclient };
      await render(<App />, { initialState, appOptions });
    });

    test('should show messages from the default channel at the start', async () => {
      const messages = await screen.findByTestId('messages');

      expect(messages).toHaveTextContent('message_in_general');
      expect(messages).not.toHaveTextContent('message_in_another_channel');
    });

    test('app should show different messages after channel switching', async () => {
      await userEvent.click(await screen.findByText('another_channel'));
      const messages = await screen.findByTestId('messages');

      expect(messages).not.toHaveTextContent('message_in_general');
      expect(messages).toHaveTextContent('message_in_another_channel');
    });
  });
});
