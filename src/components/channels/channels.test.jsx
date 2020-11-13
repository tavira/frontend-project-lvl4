import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import routes from '../../routes';
import SocketIoServer from '../../__mocks__/socket.io/socket.io-server';
import { render } from '../../tests/test-utils';
import ChannelsList from './index';

let wsserver;
let wsclient;

beforeAll(() => {
  wsserver = new SocketIoServer();
  wsclient = wsserver.socketIoClient;

  const server = setupServer(
    rest.post(routes.channelsPath(), ((req, res, context) => {
      wsserver.emit('newChannel', { data: { attributes: { id: 2, name: 'new_channel', removable: true } } });
      return res(
        context.status(201),
        context.json({
          data: {
            type: 'channels',
            id: 10,
            attributes: {},
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
  test('added channel should show in channel list', async () => {
    const initialState = {
      currentChannelId: 1,
      channels: [{ id: 1, name: 'general' }],
      messages: [],
    };

    const appOptions = { socket: wsclient };
    const {
      findByText, findByRole, container,
    } = await render(<ChannelsList />, { initialState, appOptions });
    wsserver.emit('connect');

    const button = await findByText('Add channel');
    await fireEvent.click(button);
    const inputChannelName = await findByRole('textbox');
    await userEvent.type(inputChannelName, 'added channel name');
    const saveButton = await findByText('Save changes');
    fireEvent.click(saveButton);
    await findByRole('button');
    expect(container).toHaveTextContent('new_channel');
  });
});
