import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  findByText,
  screen,
  waitFor,
  queryByText,
  act,
  findByRole,
  within,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import routes from '../routes';
import SocketIoServer from './__mocks__/socket.io/socket.io-server';
import { render } from './test-utils';
import App from '../App';

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
    rest.patch(routes.channelPath(':id'), (req, res, context) => {
      const { name } = req.body.data.attributes;
      const id = Number(req.params.id);
      const attributes = { name, id, removable: true };
      const outgoing = {
        data: {
          attributes,
          id,
          type: 'channels',
        },
      };
      wsserver.emit('renameChannel', outgoing);
      return res(
        context.status(200),
        context.json(outgoing),
      );
    }),
    rest.delete(routes.channelPath(':id'), (req, res, context) => {
      const id = Number(req.params.id);
      const outgoing = { data: { type: 'channels', id } };
      wsserver.emit('removeChannel', outgoing);
      return res(
        context.status(204),
        context.json(outgoing),
      );
    }),
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

    test.skip('add channel input should have focus when it appears', async () => {
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

    test('app should have no way to add two channels with the same name', async () => {
      await userEvent.click(await screen.findByText('Add channel'));

      await userEvent.type(await screen.findByRole('textbox'), 'general');
      await waitFor(() => {
        expect(queryByText(screen.getByRole('dialog'), 'channel with the same name already exists')).toBeInTheDocument();
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

  describe('rename channels', () => {
    const initialState = {
      currentChannelId: 1,
      channels: [
        { id: 1, name: 'general', removable: false },
        { id: 2, name: 'another_channel', removable: true },
      ],
      messages: [],
    };

    beforeEach(async () => {
      const appOptions = { socket: wsclient };
      await render(<App />, { initialState, appOptions });
      wsserver.emit('connect');
    });

    test('app should show updated channel name', async () => {
      const channelBlock = await screen.findByText('another_channel');
      const channelDropdown = channelBlock.closest('.dropdown').querySelector('.dropdown-toggle');
      await act(async () => {
        await userEvent.click(channelDropdown);
      });
      await act(async () => {
        await userEvent.click(await screen.findByText('Rename'));
      });
      await userEvent.type(await screen.findByTestId('input-name'), ' 123');
      await userEvent.click(await screen.findByText('Save changes'));

      await waitFor(async () => {
        expect(screen.queryByText('another_channel')).not.toBeInTheDocument();
        expect(screen.queryByText('another_channel 123')).toBeInTheDocument();
        const messagesBlock = await screen.findByTestId('messages-block');
        expect(await findByRole(messagesBlock, 'heading')).toHaveTextContent('# general');
      });
      userEvent.click(await screen.findByText('another_channel 123'));
      const messagesBlock = await screen.findByTestId('messages-block');

      expect(await findByRole(messagesBlock, 'heading')).toHaveTextContent('# another_channel 123');
    });

    test('rename modal window should show occurred errors', async () => {
      const expectedErrorText = 'Request failed with status code 500';
      server.use(
        rest.patch(routes.channelPath(':id'), (req, res, context) => res.once(
          context.status(500),
        )),
      );
      const channelBlock = await screen.findByText('another_channel');
      const channelDropdown = channelBlock.closest('.dropdown').querySelector('.dropdown-toggle');
      await act(async () => {
        await userEvent.click(channelDropdown);
      });
      await act(async () => {
        await userEvent.click(await screen.findByText('Rename'));
      });
      await userEvent.type(await screen.findByTestId('input-name'), ' 123');
      await userEvent.click(await screen.findByText('Save changes'));

      await waitFor(async () => {
        const dialog = await screen.findByRole('dialog');
        expect(queryByText(dialog, expectedErrorText)).toBeInTheDocument();
      });
    });

    test('app should no way to rename channel to empty name', async () => {
      const channelBlock = await screen.findByText('another_channel');
      const channelDropdown = channelBlock.closest('.dropdown').querySelector('.dropdown-toggle');
      await act(async () => {
        await userEvent.click(channelDropdown);
      });
      await act(async () => {
        await userEvent.click(await screen.findByText('Rename'));
      });

      await userEvent.type(await screen.findByRole('textbox'), '{selectall}');
      await userEvent.type(await screen.findByRole('textbox'), '{backspace}');
      await waitFor(() => {
        expect(queryByText(screen.getByRole('dialog'), 'required')).toBeInTheDocument();
      });
    });

    test('app should have no way to add two channels with the same name', async () => {
      await userEvent.click(await screen.findByText('Add channel'));

      await userEvent.type(await screen.findByRole('textbox'), 'general');
      await waitFor(() => {
        expect(queryByText(screen.getByRole('dialog'), 'channel with the same name already exists')).toBeInTheDocument();
      });
    });
  });

  describe('remove channels', () => {
    const initialState = {
      currentChannelId: 2,
      channels: [
        { id: 1, name: 'general', removable: false },
        { id: 2, name: 'removable_channel', removable: true },
      ],
      messages: [
        {
          id: 1, username: 'user1', message: 'message_in_general', channelId: 1,
        },
        {
          id: 2, username: 'user2', message: 'message_in_removable', channelId: 2,
        },
      ],
    };

    beforeEach(async () => {
      const appOptions = { socket: wsclient };
      await render(<App />, { initialState, appOptions });
      wsserver.emit('connect');
    });

    test('should be able to remove removable channel', async () => {
      const channelBlock = await screen.findByText('removable_channel');
      const channelDropdown = channelBlock.closest('.dropdown').querySelector('.dropdown-toggle');
      await act(async () => {
        await userEvent.click(channelDropdown);
      });
      await act(async () => {
        await userEvent.click(await screen.findByText('Remove'));
      });
      await act(async () => {
        await userEvent.click(await screen.findByRole('button', { name: 'Remove' }));
      });

      await waitFor(() => {
        expect(screen.queryByText('removable_channel')).not.toBeInTheDocument();
      });

      const { queryByRole } = within(await screen.findByTestId('messages-block'));
      expect(queryByRole('heading')).toHaveTextContent('# general');
      expect(screen.queryByTestId('messages')).toHaveTextContent('message_in_general');
      expect(screen.queryByTestId('messages')).not.toHaveTextContent('message_in_removable');
    });

    test('should not be able to remove non-removable channel', async () => {
      const channelBlock = await screen.findByText('general');
      const channelDropdown = channelBlock.closest('.dropdown').querySelector('.dropdown-toggle');
      expect(channelDropdown).toBeNull();
    });

    test('remove modal should show occurred errors', async () => {
      const expectedErrorText = 'Request failed with status code 500';
      server.use(
        rest.delete(routes.channelPath(':id'), (req, res, context) => res.once(
          context.status(500),
        )),
      );

      const channelBlock = await screen.findByText('removable_channel');
      const channelDropdown = channelBlock.closest('.dropdown').querySelector('.dropdown-toggle');
      await act(async () => {
        await userEvent.click(channelDropdown);
      });
      await act(async () => {
        await userEvent.click(await screen.findByText('Remove'));
      });
      userEvent.click(await screen.findByRole('button', { name: 'Remove' }));

      await waitFor(async () => {
        const dialog = await screen.findByRole('dialog');
        expect(queryByText(dialog, expectedErrorText)).toBeInTheDocument();
      });
    });
  });
});
