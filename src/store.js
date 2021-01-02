import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import channelsReducer from './components/channels/channelsSlice';
import messagesReducer from './components/messages/messagesSlice';
import modalsReducer from './components/modals/modalsSlice';

export default (preloadedState, middlewares = []) => configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
  },
  preloadedState,
  middleware: getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production',
});
