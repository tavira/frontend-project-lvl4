import { createSlice, createSelector } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);

const selectChannels = channelsSelectors.selectAll;
const selectCurrentChannel = createSelector(
  (state) => selectChannels(state),
  (state) => state.channels.currentChannelId,
  (channels, currentChannelId) => channels.find((channel) => channel.id === currentChannelId),
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
    channelAdded: channelsAdapter.addOne,
  },
});

export default slice.reducer;
export const {
  initCurrentChannel,
  initChannels,
} = slice.actions;
export {
  selectChannels,
  selectCurrentChannel,
};
