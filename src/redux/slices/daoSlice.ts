import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  totalOrganizations: 0,
  joinedOrganizations: [],
  ownOrganizations: [],
  membersOfSelectedOrganization: [],
  applicantsToOrganization: [],
};

const daoSlice = createSlice({
  name: 'dao',
  initialState,
  reducers: {
    setTotalOrganizations(state, action) {
      state.totalOrganizations = action.payload;
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
  setTotalOrganizations,
  setJoinedOrganizations,
  setOwnOrganizations,
  setMembersOfSelectedOrganization,
  setApplicants,
} = daoSlice.actions;

export default daoSlice.reducer;
