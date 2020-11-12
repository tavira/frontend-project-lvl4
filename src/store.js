import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import channelsReducer from './components/channels/channelsSlice';
import editedMessageReducer from './components/editedMessage/editedMessageSlice';
import messagesReducer from './components/messages/messagesSlice';


export default (initialState = {}, middlewares = []) => configureStore({
  reducer: {
    channels: channelsReducer,
    editedMessage: editedMessageReducer,
    messages: messagesReducer,
  },
  middleware: getDefaultMiddleware().concat(middlewares),
  preloadedState: {
    messages: {
      entities: initialState.messages,
      ids: initialState.messages.map((message) => message.id),
    },
  },
  devTools: process.env.NODE_ENV !== 'production',
});
