import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import channelsReducer from './components/channels/channelsSlice';
import messagesReducer from './components/messages/messagesSlice';


export default (middlewares = []) => configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  },
  middleware: getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production',
});
