import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keyringOptions: [],
  selectedKeyring: {
    key: '',
    value: '',
    text: '',
  },
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setSelectedKeyringAction(state, action) {
      state.selectedKeyring = action.payload;
    },
    setKeyringOptionsAction(state, action) {
      state.keyringOptions = action.payload;
    },
  },
});

export const {
  setSelectedKeyringAction,
  setKeyringOptionsAction,
} = accountSlice.actions;

export default accountSlice.reducer;
