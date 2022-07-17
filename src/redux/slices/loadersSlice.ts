import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: false,
  tasks: false,
  message: ''
};

const loadersSlice = createSlice({
  name: 'loaders',
  initialState,
  reducers: {
    setLoading(state, action) {
      (state as any)[action.payload.type] = action.payload.value;
      state.message = action.payload.message;
    },
    resetLoading(state) {
      state = {
        ...initialState
      }
    },
  },
});

export const { setLoading, resetLoading } = loadersSlice.actions;

export default loadersSlice.reducer;
