import React from 'react';
import '@testing-library/jest-dom';
import SocketIoServer from './__mocks__/socket.io/socket.io-server';
import { render } from './test-utils';
import Messages from '../components/messages/messages';

let wsserver;
let wsclient;
beforeEach(() => {
  wsserver = new SocketIoServer();
  wsclient = wsserver.socketIoClient;
});

describe('test to recieve messages', () => {
  test('incoming message should display: author, message', async () => {
    const initialState = {
      currentChannelId: 1,
      channels: [{ id: 1, name: 'general' }],
      messages: [],
    };
    const incomingMessage1 = {
      id: 1,
      username: 'test user',
      message: 'test message',
      channelId: 1,
    };
    const incomingMessage2 = {
      id: 2,
      username: 'test user 2',
      message: 'another message 2',
      channelId: 1,
    };

    const appOptions = { socket: wsclient };
    const { container } = await render(<Messages />, { initialState, appOptions });
    wsserver.emit('connect');
    wsserver.emit('newMessage', { data: { attributes: incomingMessage1 } });
    wsserver.emit('newMessage', { data: { attributes: incomingMessage2 } });

    expect(container).toHaveTextContent(incomingMessage1.username);
    expect(container).toHaveTextContent(incomingMessage1.message);
    expect(container).toHaveTextContent(incomingMessage2.username);
    expect(container).toHaveTextContent(incomingMessage2.message);
  });

  test('should show only active channel messages', async () => {
    const initialState = {
      currentChannelId: 1,
      channels: [{ id: 1, name: 'general' }],
      messages: [],
    };
    const incomingMessage1 = {
      id: 1,
      username: 'user1',
      message: 'message1',
      channelId: 2,
    };
    const incomingMessage2 = {
      id: 2,
      username: 'user1',
      message: 'message2',
      channelId: 1,
    };

    const appOptions = { socket: wsclient };
    const { container } = await render(<Messages />, { initialState, appOptions });
    wsserver.emit('connect');
    wsserver.emit('newMessage', { data: { attributes: incomingMessage1 } });
    wsserver.emit('newMessage', { data: { attributes: incomingMessage2 } });

    expect(container).not.toHaveTextContent(incomingMessage1.message);
    expect(container).toHaveTextContent(incomingMessage2.message);
  });
});
