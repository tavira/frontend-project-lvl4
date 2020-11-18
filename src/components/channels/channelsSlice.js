/* eslint-disable no-param-reassign */
import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { apiSendChannel } from '../../api';

const channelsAdapter = createEntityAdapter();
const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);

const selectChannels = channelsSelectors.selectAll;
const selectCurrentChannel = createSelector(
  (state) => selectChannels(state),
  (state) => state.channels.currentChannelId,
  (channels, currentChannelId) => channels.find((channel) => channel.id === currentChannelId),
);

const addChannel = createAsyncThunk(
  'channels/addChannel',
  async (values, { rejectWithValue }) => {
    try {
      const response = await apiSendChannel(values);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const slice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    initChannels(state, action) {
      channelsAdapter.setAll(state, action.payload);
    },
    initCurrentChannel(state, action) {
      state.currentChannelId = action.payload.currentChannelId;
    },
    switchChannel(state, action) {
      state.currentChannelId = action.payload.id;
    },
    channelAdded: channelsAdapter.addOne,
  },
});

export default slice.reducer;
export const {
  initCurrentChannel,
  initChannels,
  switchChannel,
  channelAdded,
} = slice.actions;
export {
  addChannel,
  selectChannels,
  selectCurrentChannel,
};
