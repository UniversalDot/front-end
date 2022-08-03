export const statusTypes = {
  INIT: 'INIT',
  IN_BLOCK: 'IN_BLOCK',
  FINALIZED: 'FINALIZED',
  ERROR: 'ERROR',
};

export const loadingTypes = {
  KEYRING: 'keyring',
  PROFILE: 'profile',
  TASKS: 'tasks',
  DAO: 'dao',
};

export const toastTypes = {
  DEFAULT: '',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warn',
  ERROR: 'error',
};

export const pallets = {
  PROFILE: 'profile',
  TASK: 'task',
  DAO: 'dao',
};

export enum ProfileCallables {
  PROFILES = 'profiles',
  CREATE_PROFILE = 'createProfile',
  UPDATE_PROFILE = 'updateProfile',
  REMOVE_PROFILE = 'removeProfile',
};

export enum TaskCallables {
  TASKS_OWNED = 'tasksOwned',
  GET_TASK = 'tasks',
  TASKS = 'tasks',
  CREATE_TASK = 'createTask',
  START_TASK = 'startTask',
  COMPLETE_TASK = 'completeTask',
  REMOVE_TASK = 'removeTask',
  UPDATE_TASK = 'updateTask',
  ACCEPT_TASK = 'acceptTask',
  REJECT_TASK = 'rejectTask',
};

export const daoCallables = {
  ADD_MEMBERS: 'addMembers',
  ADD_TASKS: 'addTasks',
  CREATE_ORGANIZATION: 'createOrganization',
  CREATE_VISION: 'createVision',
  DISSOLVE_ORGANIZATION: 'dissolveOrganization',
  REMOVE_MEMBERS: 'removeMembers',
  REMOVE_TASKS: 'removeTasks',
  REMOVE_VISION: 'removeVision',
  SIGN_VISION: 'signVision',
  UNSIGN_VISION: 'unsignVision',
  // QUERY callables:
  MEMBER_OF: 'memberOf',
  ORGANIZATION_COUNT: 'organizationCount',
  VISION: 'vision',
  VISION_COUNT: 'visionCount',
  APPLICANTS_TO_ORGANIZATION: 'applicantsToOrganization',
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