/* eslint-disable no-param-reassign */
import {
  createSlice,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);

const selectChannels = channelsSelectors.selectAll;
const selectCurrentChannel = createSelector(
  (state) => selectChannels(state),
  (state) => state.channels.currentChannelId,
  (channels, currentChannelId) => channels.find((channel) => channel.id === currentChannelId),
);
const selectAddedChannelsNames = createSelector(
  (state) => selectChannels(state),
  (channels) => channels.map((channel) => channel.name),
);

export const slice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    switchChannel(state, action) {
      state.currentChannelId = action.payload.id;
    },
    channelAdded: channelsAdapter.addOne,
    channelRenamed: channelsAdapter.upsertOne,
    channelRemoved(state, action) {
      channelsAdapter.removeOne(state, action.payload.id);
      state.currentChannelId = state.defaultChannelId;
    },
  },
});

export default slice.reducer;
export const {
  switchChannel,
  channelAdded,
  channelRenamed,
  channelRemoved,
} = slice.actions;
export {
  selectChannels,
  selectCurrentChannel,
  selectAddedChannelsNames,
};
