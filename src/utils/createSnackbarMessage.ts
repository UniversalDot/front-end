import { Pallets, ProfileCallables, TaskCallables, MessageTiming, ActionType, TransactionStatus, DaoCallables } from "src/types";

export default function createSnackbarMessage(enqueueSnackbar: Function, messageTiming: MessageTiming, pallet: Pallets, actionType: ActionType, transactionStatus?: TransactionStatus, customMessage?: string) {
  if (pallet === Pallets.PROFILE) {
    if (messageTiming === MessageTiming.INIT) {
      if (actionType === ProfileCallables.CREATE_PROFILE) {
        enqueueSnackbar('Creating profile...', { autoHideDuration: 5000 })
      }

      if (actionType === ProfileCallables.UPDATE_PROFILE) {
        enqueueSnackbar('Updating profile...', { autoHideDuration: 5000 })
      }

      if (actionType === ProfileCallables.REMOVE_PROFILE) {
        enqueueSnackbar('Deleting profile...', { autoHideDuration: 5000 })
      }
    }

    if (messageTiming === MessageTiming.FINAL) {
      if (actionType === ProfileCallables.CREATE_PROFILE) {
        enqueueSnackbar('Profile created successfully!', { autoHideDuration: 5000 })
      }

      if (actionType === ProfileCallables.UPDATE_PROFILE) {
        enqueueSnackbar('Profile updated successfully!', { autoHideDuration: 5000 })
      }

      if (actionType === ProfileCallables.REMOVE_PROFILE) {
        enqueueSnackbar('Profile removed successfully!', { autoHideDuration: 5000 })
      }
    }
  }

  if (pallet === Pallets.TASK) {
    if (messageTiming === MessageTiming.INIT) {
      if (actionType === TaskCallables.ACCEPT_TASK) {
        enqueueSnackbar('Accepting task...', { autoHideDuration: 5000 })
      }

      if (actionType === TaskCallables.REJECT_TASK) {
        enqueueSnackbar('Rejecting task...', { autoHideDuration: 5000 })
      }

      if (actionType === TaskCallables.CREATE_TASK) {
        enqueueSnackbar('Creating task...', { autoHideDuration: 5000 })
      }

      if (actionType === TaskCallables.START_TASK) {
        enqueueSnackbar('Starting task...', { autoHideDuration: 5000 })
      }

      if (actionType === TaskCallables.COMPLETE_TASK) {
        enqueueSnackbar('Completing task...', { autoHideDuration: 5000 })
      }

      if (actionType === TaskCallables.REMOVE_TASK) {
        enqueueSnackbar('Deleting task...', { autoHideDuration: 5000 })
      }
    }

    if (messageTiming === MessageTiming.FINAL) {
      if (transactionStatus && transactionStatus === TransactionStatus.SUCCESS) {
        if (actionType === TaskCallables.ACCEPT_TASK) {
          enqueueSnackbar('Task accepted successfully!', { autoHideDuration: 5000 })
        }

        if (actionType === TaskCallables.REJECT_TASK) {
          enqueueSnackbar('Task rejected successfully!', { autoHideDuration: 5000 })
        }

        if (actionType === TaskCallables.CREATE_TASK) {
          enqueueSnackbar('Task created successfully!', { autoHideDuration: 5000 })
        }

        if (actionType === TaskCallables.START_TASK) {
          enqueueSnackbar('Task started successfully!', { autoHideDuration: 5000 })
        }

        if (actionType === TaskCallables.COMPLETE_TASK) {
          enqueueSnackbar('Task completed successfully!', { autoHideDuration: 5000 })
        }

        if (actionType === TaskCallables.REMOVE_TASK) {
          enqueueSnackbar('Task removed successfully!', { autoHideDuration: 5000 })
        }
      }

      if (transactionStatus && transactionStatus === TransactionStatus.FAIL) {
        if (actionType === TaskCallables.ACCEPT_TASK) {
          enqueueSnackbar(`Sorry, error occured: ${customMessage}`, { variant: 'error', autoHideDuration: 5000 })
        }

        if (actionType === TaskCallables.REJECT_TASK) {
          enqueueSnackbar(`Sorry, error occured: ${customMessage}`, { variant: 'error', autoHideDuration: 5000 })
        }

        if (actionType === TaskCallables.CREATE_TASK) {
          enqueueSnackbar(`Sorry, error occured: ${customMessage}`, { variant: 'error', autoHideDuration: 5000 })
        }

        if (actionType === TaskCallables.START_TASK) {
          enqueueSnackbar(`Sorry, error occured: ${customMessage}`, { variant: 'error', autoHideDuration: 5000 })
        }

        if (actionType === TaskCallables.COMPLETE_TASK) {
          enqueueSnackbar(`Sorry, error occured: ${customMessage}`, { variant: 'error', autoHideDuration: 5000 })
        }

        if (actionType === TaskCallables.REMOVE_TASK) {
          enqueueSnackbar(`Sorry, error occured: ${customMessage}`, { variant: 'error', autoHideDuration: 5000 })
        }
      }
    }
  }

  if (pallet === Pallets.DAO) {
    if (messageTiming === MessageTiming.INIT) {
      if (actionType === DaoCallables.ORGANIZATION_TASKS) {
        enqueueSnackbar('Fetching organization tasks...', { autoHideDuration: 5000 })
      }

      if (actionType === DaoCallables.MEMBERS) {
        enqueueSnackbar('Fetching organization members...', { autoHideDuration: 5000 })
      }
    }

    if (messageTiming === MessageTiming.FINAL) {
      if (actionType === DaoCallables.ORGANIZATION_TASKS) {
        enqueueSnackbar('Organization tasks fetched successfully!', { autoHideDuration: 5000 })
      }

      if (actionType === DaoCallables.MEMBERS) {
        enqueueSnackbar('Organization members fetched successfully!', { autoHideDuration: 5000 })
      }
    }
  }

  return;
}