/* eslint-disable indent */
import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from '../../redux/store';
import { web3FromSource } from '@polkadot/extension-dapp';
import { useSubstrateState } from '../../substrate-lib';
import {
  setTasks,
  setTaskTitle,
  setTaskSpecification,
  setTaskBudget,
  setTaskDeadline,
  resetTask,
  resetTasks,
  // setTaskIsEditMode,
  setError,
} from '../../redux/slices/tasksSlice';
import { useUser } from './useUser';
import { useStatus } from './useStatus';
import { useLoader } from './useLoader';
import {
  statusTypes,
  pallets,
  TaskCallables,
  loadingTypes,
} from '../../types';

const useTasks = () => {
  const dispatch = useDispatch();
  const { api, keyring, keyringState } = useSubstrateState();
  const [unsub, setUnsub] = useState<Function | null>(null);

  const { selectedKeyring } = useUser();
  const { setStatus, setStatusMessage } = useStatus();
  const { setLoading } = useLoader();

  // TODO: reformat it to be DRY;
  const taskValues = useSelector(state => state.tasks.task);
  const isEditMode = useSelector(state => state.tasks.isEditMode);
  const tasks = useSelector(state => state.tasks.tasks);
  const taskErrors = useSelector(state => state.tasks.errors);

  const resetAllTasks = useCallback(() => dispatch(resetTasks()), [dispatch]);

  const populateTask = useCallback(
    ({ key, value }) => {
      // Validate input
      if (key === 'budget' || key === 'deadline') {
        if (!isNaN(value) && parseInt(value) < 0) {
          dispatch(
            setError({
              input: key,
              error: 'Negative numbers are not allowed',
            })
          );
        } else if (value && isNaN(value)) {
          dispatch(
            setError({
              input: key,
              error: 'Enter a valid number',
            })
          );
        } else {
          dispatch(
            setError({
              input: key,
              error: '',
            })
          );
        }
      }

      if (key === 'title') {
        dispatch(setTaskTitle(value));
      }
      if (key === 'specification') {
        dispatch(setTaskSpecification(value));
      }
      if (key === 'budget') {
        dispatch(setTaskBudget(value));
      }
      if (key === 'deadline') {
        dispatch(setTaskDeadline(value));
      }
    },
    [dispatch]
  );

  const getTask = useCallback(
    (taskId, responseHandler) => {
      const query = async () => {
        const unsub = await api?.query[pallets.TASK][TaskCallables.GET_TASK](
          taskId,
          responseHandler
        );
        const cb = () => unsub;
        cb();
      };

      query();
    },
    [api]
  );

  // const getTaskToEdit = useCallback(
  //   taskId => {
  //     const queryResHandler = result => {
  //       if (!result.isNone) {
  //         dispatch(setTaskIsEditMode(true));
  //         dispatch(setTaskSpecification(result.toHuman().specification));
  //         dispatch(setTaskBudget(result.toHuman().budget));
  //         dispatch(setTaskDeadline(result.toHuman().deadline));
  //       }
  //     };

  //     const query = async () => {
  //       const unsub = await api?.query[pallets.TASK][TaskCallables.GET_TASK](
  //         taskId,
  //         queryResHandler
  //       );
  //       const cb = () => unsub;
  //       cb();
  //     };

  //     query();
  //   },
  //   [api, dispatch]
  // );

  const queryResponseHandler = useCallback(
    result => {
      setLoading({ type: loadingTypes.TASKS, value: false });
      setStatusMessage('');

      console.log('tasks res', result.toHuman())

      if (result.isNone) {
        dispatch(setTasks([]));
      }

      dispatch(setTasks(result.toHuman()));
    },
    [dispatch, setLoading, setStatusMessage]
  );

  const queryPreparedResponseHandler = useCallback(
    (result: any[]) => {
      setLoading({ type: loadingTypes.TASKS, value: false });
      setStatusMessage('');

      if (result.length === 0) {
        dispatch(setTasks([]));
      }

      dispatch(setTasks(result));
    },
    [dispatch, setLoading, setStatusMessage]
  );

  const getAllOwnedTasks = useCallback(() => {
    setLoading({ type: loadingTypes.TASKS, value: true });
    setStatusMessage('Loading tasks...');
    if (selectedKeyring.value) {
      const query = async () => {
        const unsub = await api.query[pallets.TASK][TaskCallables.TASKS_OWNED](
          selectedKeyring.value,
          queryResponseHandler
        );
        const cb = () => unsub;
        cb();
      };

      query();
    }
  }, [
    selectedKeyring.value,
    api,
    queryResponseHandler,
    setLoading,
    setStatusMessage,
  ]);

  const getAllTaskEntries = useCallback(() => {
    setLoading({ type: loadingTypes.TASKS, value: true });
    setStatusMessage('Loading tasks...');
    if (selectedKeyring.value) {
      const query = async () => {
        const allTaskEntries = (await api.query[pallets.TASK][TaskCallables.TASKS].entries());

        const entriesPrepared = allTaskEntries.map((entry: any[]) => {
          const entryString = entry.toString();
          const taskObject = entry[1].toHuman();

          return {
            taskId: entryString.split(',')[0],
            ...taskObject
          }
        });

        queryPreparedResponseHandler(entriesPrepared)
      };

      query();
    }
  }, [
    selectedKeyring.value,
    api,
    setLoading,
    setStatusMessage,
    queryPreparedResponseHandler
  ]);

  const signedTransaction = async (actionType: any, taskPayload: any, enqueueSnackbar: Function) => {
    const accountPair =
      selectedKeyring.value &&
      keyringState === 'READY' &&
      keyring.getPair(selectedKeyring.value);

    const getFromAcct = async () => {
      const {
        address,
        meta: { source, isInjected },
      } = accountPair;
      let fromAcct;

      // signer is from Polkadot-js browser extension
      if (isInjected) {
        const injected = await web3FromSource(source);
        fromAcct = address;
        api.setSigner(injected.signer);
      } else {
        fromAcct = accountPair;
      }

      return fromAcct;
    };

    const fromAcct = await getFromAcct();

    const transformedPayloadForCreate = [
      taskPayload?.title || '',
      taskPayload?.specification || '',
      taskPayload?.budget || '',
      taskPayload?.deadline || '',
    ];

    const transformedPayloadForStartCompleteRemove = [taskPayload];

    let txExecute;

    if (actionType === TaskCallables.ACCEPT_TASK) {
      txExecute = api.tx[pallets.TASK][actionType](
        ...transformedPayloadForStartCompleteRemove
      );
    }

    if (actionType === TaskCallables.CREATE_TASK) {
      txExecute = api.tx[pallets.TASK][actionType](
        ...transformedPayloadForCreate
      );
    }

    if (actionType === TaskCallables.START_TASK) {
      txExecute = api.tx[pallets.TASK][TaskCallables.START_TASK](
        ...transformedPayloadForStartCompleteRemove
      );
    }

    if (actionType === TaskCallables.COMPLETE_TASK) {
      txExecute = api.tx[pallets.TASK][TaskCallables.COMPLETE_TASK](
        ...transformedPayloadForStartCompleteRemove
      );
    }

    if (actionType === TaskCallables.REMOVE_TASK) {
      txExecute = api.tx[pallets.TASK][TaskCallables.REMOVE_TASK](
        ...transformedPayloadForStartCompleteRemove
      );
    }

    const transactionResponseHandler = (response: any) => {
      const callStatus = response.status;

      console.log('response', response)

      // @TODO - do this only if tasks is not prepared variety (meaning not calling allTaskEntries)
      // if (callStatus?.isFinalized) {
      //   getAllOwnedTasks();
      // }

      if (callStatus?.isInBlock) {
        setLoading({ type: loadingTypes.TASKS, value: false, message: '' });
        if (actionType === TaskCallables.ACCEPT_TASK) {
          enqueueSnackbar('Task accepted successfully!')
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
    };

    const transactionErrorHandler = (err: any) => {
      setStatus(statusTypes.ERROR);
      setStatusMessage(err.toString());
    };

    const unsub = await txExecute
      .signAndSend(fromAcct, transactionResponseHandler)
      .catch(transactionErrorHandler);

    setUnsub(() => unsub);
  };

  const taskAction = async (actionType: any, taskPayload: any, enqueueSnackbar: Function) => {
    if (typeof unsub === 'function') {
      unsub();
      setUnsub(null);
    }

    setStatus(statusTypes.INIT);

    if (actionType === TaskCallables.ACCEPT_TASK) {
      enqueueSnackbar('Accepting task...')
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

    setLoading({ type: loadingTypes.TASKS, value: true, message: 'Task action ongoing...' });
    signedTransaction(actionType, taskPayload, enqueueSnackbar);
    dispatch(resetTask());
  };

  return {
    getTask,
    taskAction,
    populateTask,
    taskValues,
    isEditMode,
    getAllOwnedTasks,
    getAllTaskEntries,
    tasks,
    resetAllTasks,
    taskErrors,
  };
};

export { useTasks };
