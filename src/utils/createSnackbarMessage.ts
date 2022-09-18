import { Pallets, ProfileCallables, TaskCallables, MessageTiming, ActionType, TransactionStatus, DaoCallables } from "src/types";

export default function createSnackbarMessage(enqueueSnackbar: Function, messageTiming: MessageTiming, pallet: Pallets, actionType: ActionType, transactionStatus?: TransactionStatus, customMessage?: string) {
  // PROFILE
  if (pallet === Pallets.PROFILE) {
    // INIT
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
    // FINAL
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

      // FAIL
      if (transactionStatus && transactionStatus === TransactionStatus.FAIL) {
        if (pallet === Pallets.PROFILE && actionType) {
          enqueueSnackbar(`Sorry, error occured: ${customMessage}`, { variant: 'error', autoHideDuration: 5000 })
        }
      }
    }
  }
  // TASK
  if (pallet === Pallets.TASK) {
    // INIT
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

      if (actionType === TaskCallables.UPDATE_TASK) {
        enqueueSnackbar('Updating task...', { autoHideDuration: 5000 })
      }

      if (actionType === TaskCallables.COMPLETE_TASK) {
        enqueueSnackbar('Completing task...', { autoHideDuration: 5000 })
      }

      if (actionType === TaskCallables.REMOVE_TASK) {
        enqueueSnackbar('Deleting task...', { autoHideDuration: 5000 })
      }
    }
    // FINAL
    if (messageTiming === MessageTiming.FINAL) {
      // SUCCESS
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

        if (actionType === TaskCallables.UPDATE_TASK) {
          enqueueSnackbar('Task updated successfully!', { autoHideDuration: 5000 })
        }
      }
      // FAIL  
      if (transactionStatus && transactionStatus === TransactionStatus.FAIL) {
        if (pallet === Pallets.TASK && actionType) {
          enqueueSnackbar(`Sorry, error occured: ${customMessage}`, { variant: 'error', autoHideDuration: 5000 })
        }
      }
    }
  }

  // DAO
  if (pallet === Pallets.DAO) {
    // INIT
    if (messageTiming === MessageTiming.INIT) {
      // QUERY
      if (actionType === DaoCallables.ORGANIZATION_TASKS) {
        enqueueSnackbar('Fetching organization tasks...', { autoHideDuration: 5000 })
      }

      if (actionType === DaoCallables.MEMBERS) {
        enqueueSnackbar('Fetching organization members...', { autoHideDuration: 5000 })
      }

      if (actionType === DaoCallables.ORGANIZATIONS) {
        enqueueSnackbar('Fetching organizations...', { autoHideDuration: 5000 })
      }

      // EXTRINSIC
      if (actionType === DaoCallables.ADD_MEMBERS) {
        enqueueSnackbar('Adding member to organization...', { autoHideDuration: 5000 })
      }

      if (actionType === DaoCallables.ADD_TASKS) {
        enqueueSnackbar('Adding task to organization...', { autoHideDuration: 5000 })
      }

      if (actionType === DaoCallables.CREATE_ORGANIZATION) {
        enqueueSnackbar('Creating organization...', { autoHideDuration: 5000 })
      }

      if (actionType === DaoCallables.DISSOLVE_ORGANIZATION) {
        enqueueSnackbar('Dissolving organization...', { autoHideDuration: 5000 })
      }

      if (actionType === DaoCallables.UPDATE_ORGANIZATION) {
        enqueueSnackbar('Updating organization...', { autoHideDuration: 5000 })
      }

      if (actionType === DaoCallables.TRANSFER_OWNERSHIP) {
        enqueueSnackbar('Transfering ownership of organization...', { autoHideDuration: 5000 })
      }

      if (actionType === DaoCallables.REMOVE_MEMBERS) {
        enqueueSnackbar('Removing member from organization...', { autoHideDuration: 5000 })
      }

      if (actionType === DaoCallables.REMOVE_TASKS) {
        enqueueSnackbar('Removing task from organization...', { autoHideDuration: 5000 })
      }
    }

    // FINAL
    if (messageTiming === MessageTiming.FINAL) {
      // QUERY
      if (actionType === DaoCallables.ORGANIZATION_TASKS) {
        enqueueSnackbar('Organization tasks fetched successfully!', { autoHideDuration: 5000 })
      }

      if (actionType === DaoCallables.MEMBERS) {
        enqueueSnackbar('Organization members fetched successfully!', { autoHideDuration: 5000 })
      }

      if (actionType === DaoCallables.ORGANIZATIONS) {
        enqueueSnackbar('Organizations fetched successfully!', { autoHideDuration: 5000 })
      }

      // EXTRINSIC
      if (actionType === DaoCallables.ADD_MEMBERS) {
        enqueueSnackbar('Member added successfully!', { autoHideDuration: 5000 })
      }

      if (actionType === DaoCallables.ADD_TASKS) {
        enqueueSnackbar('Task added successfully!', { autoHideDuration: 5000 })
      }

      if (actionType === DaoCallables.CREATE_ORGANIZATION) {
        enqueueSnackbar('Organization created successfully!', { autoHideDuration: 5000 })
      }

      if (actionType === DaoCallables.DISSOLVE_ORGANIZATION) {
        enqueueSnackbar('Organization dissolved successfully!', { autoHideDuration: 5000 })
      }

      if (actionType === DaoCallables.UPDATE_ORGANIZATION) {
        enqueueSnackbar('Organization updated successfully!', { autoHideDuration: 5000 })
      }

      if (actionType === DaoCallables.TRANSFER_OWNERSHIP) {
        enqueueSnackbar('Organization ownership transferred successfully!', { autoHideDuration: 5000 })
      }

      if (actionType === DaoCallables.REMOVE_MEMBERS) {
        enqueueSnackbar('Member removed successfully!', { autoHideDuration: 5000 })
      }

      if (actionType === DaoCallables.REMOVE_TASKS) {
        enqueueSnackbar('Task removed successfully!', { autoHideDuration: 5000 })
      }

      // FAIL
      if (transactionStatus && transactionStatus === TransactionStatus.FAIL) {
        if (pallet === Pallets.DAO && actionType) {
          enqueueSnackbar(`Sorry, error occured: ${customMessage}`, { variant: 'error', autoHideDuration: 5000 })
        }
      }
    }
  }

  return;
}