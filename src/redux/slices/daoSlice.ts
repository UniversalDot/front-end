import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  totalOrganizations: 0,
  totalVisions: 0,
  joinedOrganizations: [],
  ownOrganizations: [],
  membersOfSelectedOrganization: [],
  suggestedVisions: [],
  visionNameForAction: '',
  organizationNameForAction: '',
  memberOrTaskForAction: '',
  applicantsToOrganization: [],
};

const daoSlice = createSlice({
  name: 'dao',
  initialState,
  reducers: {
    setTotalOrganizations(state, action) {
      state.totalOrganizations = action.payload;
    },
    setTotalVisions(state, action) {
      state.totalVisions = action.payload;
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
    setSuggestedVisions(state, action) {
      state.suggestedVisions = action.payload;
    },
    setVisionName(state, action) {
      state.visionNameForAction = action.payload;
    },
    setOrganizationName(state, action) {
      state.organizationNameForAction = action.payload;
    },
    setMemberOrTask(state, action) {
      state.memberOrTaskForAction = action.payload;
    },
    setApplicants(state, action) {
      state.applicantsToOrganization = action.payload;
    },
    resetState(state) {
      state.visionNameForAction = '';
      state.organizationNameForAction = '';
      state.memberOrTaskForAction = '';
    },
  },
});

export const {
  setTotalOrganizations,
  setTotalVisions,
  setJoinedOrganizations,
  setOwnOrganizations,
  setMembersOfSelectedOrganization,
  setSuggestedVisions,
  setVisionName,
  setOrganizationName,
  setMemberOrTask,
  setApplicants,
  resetState,
} = daoSlice.actions;

export default daoSlice.reducer;
