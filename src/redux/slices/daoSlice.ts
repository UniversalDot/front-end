import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  joinedOrganizations: [],
  ownOrganizations: [],
  membersOfSelectedOrganization: [],
  applicantsToOrganization: [],
  organizationTasks: []
};

const daoSlice = createSlice({
  name: 'dao',
  initialState,
  reducers: {
    setOrganizationTasks(state, action) {
      state.organizationTasks = action.payload;
    },
    setOwnOrganizations(state, action) {
      state.ownOrganizations = action.payload;
    },
    setJoinedOrganizations(state, action) {
      state.joinedOrganizations = action.payload;
    },
    setMembersOfSelectedOrganization(state, action) {
      state.membersOfSelectedOrganization = action.payload;
    },
    setApplicants(state, action) {
      state.applicantsToOrganization = action.payload;
    },
  },
});

export const {
  setJoinedOrganizations,
  setOwnOrganizations,
  setMembersOfSelectedOrganization,
  setApplicants,
  setOrganizationTasks
} = daoSlice.actions;

export default daoSlice.reducer;
