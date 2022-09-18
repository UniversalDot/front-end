import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: false,
  tasks: false,
  dao: false,
  message: '',
  callablesLoadingStates: {
    profile: {
      createProfile: false,
      updateProfile: false,
      removeProfile: false,
    },
    tasks: {
      createTask: false,
      updateTask: false,
      removeTask: false,
      startTask: false,
      completeTask: false,
      acceptTask: false,
      rejectTask: false,
    },
    dao: {
      addMembers: false,
      removeMembers: false,
      addTasks: false,
      removeTasks: false,
      createOrganization: false,
      dissolveOrganization: false,
      updateOrganization: false,
      transferOwnership: false,
    }
  }
};

const loadersSlice = createSlice({
  name: 'loaders',
  initialState,
  reducers: {
    setLoading(state, action) {
      (state as any)[action.payload.type] = action.payload.value;
      state.message = action.payload.message;
    },
    setLoadingCallable(state, action) {
      ((state.callablesLoadingStates as any)[action.payload.type] as any)[action.payload.callableType] = action.payload.value;
    },
    resetLoading(state) {
      state = {
        ...initialState
      }
    },
  },
});

export const { setLoading, setLoadingCallable, resetLoading } = loadersSlice.actions;

export default loadersSlice.reducer;
