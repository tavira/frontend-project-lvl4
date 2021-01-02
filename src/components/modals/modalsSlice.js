/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'modals',
  initialState: {
    uiState: 'closed',
    type: null,
    context: null,
  },
  reducers: {
    openModal(state, { payload }) {
      state.uiState = 'opened';
      state.type = payload.type;
      state.context = payload.context;
    },
    closeModal(state) {
      state.uiState = 'closed';
      state.type = null;
      state.context = null;
    },
  },
});

export default slice.reducer;
export const {
  openModal,
  closeModal,
} = slice.actions;
