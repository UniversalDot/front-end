import { createSlice } from '@reduxjs/toolkit';

import { ProfileState } from '../../@types/universaldot';

const initialState: ProfileState = {
  data: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setProfile } =
  profileSlice.actions;

export default profileSlice.reducer;
