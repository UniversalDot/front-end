import { LoadingTypes, ProfileCallables, TaskCallables, ActionType } from "src/types";

export default function createLoadingMessage(loadingType?: LoadingTypes, actionType?: ActionType) {
  if (!actionType && loadingType === LoadingTypes.PROFILE) {
    return 'Loading account / profile...'
  }

  if (actionType && loadingType === LoadingTypes.PROFILE) {
    if (actionType === ProfileCallables.CREATE_PROFILE) {
      return 'Profile creation in process...'
    }

    if (actionType === ProfileCallables.UPDATE_PROFILE) {
      return 'Profile updating in process...'
    }

    if (actionType === ProfileCallables.REMOVE_PROFILE) {
      return 'Profile deletion in process...'
    }
  }

  if (!actionType && loadingType === LoadingTypes.TASKS) {
    return 'Loading tasks...'
  }

  if (actionType && loadingType === LoadingTypes.TASKS) {
    if (actionType === TaskCallables.ACCEPT_TASK) {
      return 'Task acception in process...'
    }

    if (actionType === TaskCallables.CREATE_TASK) {
      return 'Task creation in process...'
    }

    if (actionType === TaskCallables.START_TASK) {
      return 'Task starting in process...'
    }

    if (actionType === TaskCallables.COMPLETE_TASK) {
      return 'Task completion in process...'
    }

    if (actionType === TaskCallables.REMOVE_TASK) {
      return 'Task deletion in process...'
    }
  }

  return '';
}