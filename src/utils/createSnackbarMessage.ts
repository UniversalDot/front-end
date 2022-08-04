import { Pallets, ProfileCallables, TaskCallables, MessageTiming, ActionType } from "src/types";

export default function createSnackbarMessage(enqueueSnackbar: Function, messageTiming: MessageTiming, pallet: Pallets, actionType: ActionType) {
  if (pallet === Pallets.PROFILE) {
    if (messageTiming === MessageTiming.INIT) {
      if (actionType === ProfileCallables.CREATE_PROFILE) {
        enqueueSnackbar('Creating profile...')
      }

      if (actionType === ProfileCallables.UPDATE_PROFILE) {
        enqueueSnackbar('Updating profile...')
      }

      if (actionType === ProfileCallables.REMOVE_PROFILE) {
        enqueueSnackbar('Deleting profile...')
      }
    }

    if (messageTiming === MessageTiming.FINAL) {
      if (actionType === ProfileCallables.CREATE_PROFILE) {
        enqueueSnackbar('Profile created successfully!')
      }

      if (actionType === ProfileCallables.UPDATE_PROFILE) {
        enqueueSnackbar('Profile updated successfully!')
      }

      if (actionType === ProfileCallables.REMOVE_PROFILE) {
        enqueueSnackbar('Profile removed successfully!')
      }
    }
  }

  if (pallet === Pallets.TASK) {
    if (messageTiming === MessageTiming.INIT) {
      if (actionType === TaskCallables.ACCEPT_TASK) {
        enqueueSnackbar('Accepting task...')
      }

      if (actionType === TaskCallables.REJECT_TASK) {
        enqueueSnackbar('Rejecting task...')
      }

      if (actionType === TaskCallables.CREATE_TASK) {
        enqueueSnackbar('Creating task...')
      }

      if (actionType === TaskCallables.START_TASK) {
        enqueueSnackbar('Starting task...')
      }

      if (actionType === TaskCallables.COMPLETE_TASK) {
        enqueueSnackbar('Completing task...')
      }

      if (actionType === TaskCallables.REMOVE_TASK) {
        enqueueSnackbar('Deleting task...')
      }
    }

    if (messageTiming === MessageTiming.FINAL) {
      if (actionType === TaskCallables.ACCEPT_TASK) {
        enqueueSnackbar('Task accepted successfully!')
      }

      if (actionType === TaskCallables.REJECT_TASK) {
        enqueueSnackbar('Task rejected successfully!')
      }

      if (actionType === TaskCallables.CREATE_TASK) {
        enqueueSnackbar('Task created successfully!')
      }

      if (actionType === TaskCallables.START_TASK) {
        enqueueSnackbar('Task started successfully!')
      }

      if (actionType === TaskCallables.COMPLETE_TASK) {
        enqueueSnackbar('Task completed successfully!')
      }

      if (actionType === TaskCallables.REMOVE_TASK) {
        enqueueSnackbar('Task removed successfully!')
      }
    }
  }

  return;
}