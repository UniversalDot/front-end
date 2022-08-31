export const statusTypes = {
  INIT: 'INIT',
  IN_BLOCK: 'IN_BLOCK',
  FINALIZED: 'FINALIZED',
  ERROR: 'ERROR',
};

export enum LoadingTypes {
  KEYRING = 'keyring',
  PROFILE = 'profile',
  TASKS = 'tasks',
  DAO = 'dao',
};

export enum Pallets {
  PROFILE = 'profile',
  TASK = 'task',
  DAO = 'dao',
};

export enum ProfileCallables {
  // Extrinsic:
  CREATE_PROFILE = 'createProfile',
  UPDATE_PROFILE = 'updateProfile',
  REMOVE_PROFILE = 'removeProfile',
  // Query:
  PROFILES = 'profiles',
};

export enum TaskCallables {
  // Extrinsic:
  CREATE_TASK = 'createTask',
  START_TASK = 'startTask',
  COMPLETE_TASK = 'completeTask',
  REMOVE_TASK = 'removeTask',
  UPDATE_TASK = 'updateTask',
  ACCEPT_TASK = 'acceptTask',
  REJECT_TASK = 'rejectTask',
  // Query:
  TASKS_OWNED = 'tasksOwned',
  GET_TASK = 'tasks',
  TASKS = 'tasks',
};

export enum DaoCallables {
  // Extrinsic:
  ADD_MEMBERS = 'addMembers',
  ADD_TASKS = 'addTasks',
  CREATE_ORGANIZATION = 'createOrganization',
  CREATE_VISION = 'createVision',
  DISSOLVE_ORGANIZATION = 'dissolveOrganization',
  REMOVE_MEMBERS = 'removeMembers',
  REMOVE_TASKS = 'removeTasks',
  REMOVE_VISION = 'removeVision',
  SIGN_VISION = 'signVision',
  UNSIGN_VISION = 'unsignVision',
  TRANSFER_OWNERSHIP = 'transferOwnership',
  UPDATE_ORGANIZATION = 'updateOrganization',
  // Query:
  APPLICANTS_TO_ORGANIZATION = 'applicantsToOrganization',
  MEMBER_OF = 'memberOf',
  MEMBERS = 'members',
  ORGANIZATION_COUNT = 'organizationCount',
  ORGANIZATION_TASKS = 'organizationTasks',
  ORGANIZATIONS = 'organizations',
  PALLET_VERSION = 'palletVersion',
  VISION = 'vision',
  VISION_COUNT = 'visionCount',
};

export enum TaskStatusEnum {
  CREATED = 'Created',
  IN_PROGRESS = 'InProgress',
  COMPLETED = 'Completed',
  ACCEPTED = 'Accepted',
}

export type TaskStatus =
  | TaskStatusEnum.CREATED
  | TaskStatusEnum.IN_PROGRESS
  | TaskStatusEnum.COMPLETED
  | TaskStatusEnum.ACCEPTED;

export type TaskType = {
  taskId: string;
  title: string;
  specification: string;
  initiator: string;
  volunteer: string;
  currentOwner: string;
  status: TaskStatus;
  budget: number;
  deadline: number;
  attachments: string;
  keywords: string;
  feedback: string;
  createdAt: number;
  updatedAt: number;
  completedAt: number;
};

export enum MessageTiming {
  INIT = 'init',
  FINAL = 'final',
}

export enum TransactionStatus {
  SUCCESS = 'success',
  FAIL = 'fail',
}

export type ActionType = ProfileCallables | TaskCallables | DaoCallables;

export type ProfilePayload = {
  username: string,
  interests: string[],
  availableHoursPerWeek: string,
  otherInformation: string
}

// @TODO
export type TaskPayload = any;

export type MyProfile = {
  id: string;
  cover: string;
  position: string;
  quote: string;
  country: string;
  email: string;
  company: string;
  school: string;
  role: string;
  facebookLink: string;
  instagramLink: string;
  linkedinLink: string;
  twitterLink: string;
};

export type ProfileState = {
  data: ProfileDataAdapted;
};

export type ProfileDataSubstrate = {
  owner: string;
  name: string;
  interests: string;
  balance: string;
  reputation: string;
  availableHoursPerWeek: string;
  additionalInformation: string;
} | null;

export type ProfileDataAdapted = {
  owner: string;
  name: string;
  interests: string[];
  balance: string;
  reputation: string;
  availableHoursPerWeek: string;
  additionalInformation: string;
} | null;