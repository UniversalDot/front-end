import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    resetTasks(state) {
      state.tasks = [];
    },
  },
});

export const {
  setTasks,
  resetTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
