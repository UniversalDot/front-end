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
import { useLoader } from './useLoader';
import {
  Pallets,
  TaskCallables,
  LoadingTypes,
  MessageTiming,
  ActionType,
  TaskPayload,
  TransactionStatus
} from '../../types';
import createSnackbarMessage from '../../utils/createSnackbarMessage';
import createLoadingMessage from '../../utils/createLoadingMessage';

const useTasks = () => {
  const dispatch = useDispatch();
  const { api, keyring, keyringState } = useSubstrateState();
  const [unsub, setUnsub] = useState<Function | null>(null);

  const { selectedKeyring } = useUser();
  const { setLoading } = useLoader();

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
        const unsub = await api?.query[Pallets.TASK][TaskCallables.GET_TASK](
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
  //       const unsub = await api?.query[Pallets.TASK][TaskCallables.GET_TASK](
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
      setLoading({ type: LoadingTypes.TASKS, value: false, message: createLoadingMessage() });

      if (result.isNone) {
        dispatch(setTasks([]));
      }

      dispatch(setTasks(result.toHuman()));
    },
    [dispatch, setLoading]
  );

  const queryPreparedResponseHandler = useCallback(
    (result: any[]) => {
      setLoading({ type: LoadingTypes.TASKS, value: false, message: createLoadingMessage() });

      if (result.length === 0) {
        dispatch(setTasks([]));
      }

      dispatch(setTasks(result));
    },
    [dispatch, setLoading]
  );

  const getAllOwnedTasks = useCallback(() => {
    setLoading({ type: LoadingTypes.TASKS, value: true, message: createLoadingMessage(LoadingTypes.TASKS) });

    if (selectedKeyring.value) {
      const query = async () => {
        const unsub = await api.query[Pallets.TASK][TaskCallables.TASKS_OWNED](
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
  ]);

  const getAllTaskEntries = useCallback(() => {
    setLoading({ type: LoadingTypes.TASKS, value: true, message: createLoadingMessage(LoadingTypes.TASKS) });

    if (selectedKeyring.value) {
      const query = async () => {
        const allTaskEntries = (await api.query[Pallets.TASK][TaskCallables.TASKS].entries());
        const entriesPrepared = allTaskEntries.map((entry: any[]) => {
          const entryString = entry.toString();
          const taskObject = entry[1].toHuman();

          return {
            taskId: `0x${entryString.split(',')[0].substring(82)}`,
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
    queryPreparedResponseHandler
  ]);

  const signedTransaction = async (actionType: ActionType, taskPayload: TaskPayload, enqueueSnackbar: Function) => {
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
      taskPayload?.attachments || '',
      taskPayload?.keywords || '',
    ];

    const transformedPayloadOnlyTaskId = [taskPayload];

    // @TODO - do the payload for reject;
    const transformedPayloadReject = [taskPayload, 'some feedback about the rejection'];

    let txExecute;

    if (actionType === TaskCallables.ACCEPT_TASK) {
      txExecute = api.tx[Pallets.TASK][actionType](
        ...transformedPayloadOnlyTaskId
      );
    }

    if (actionType === TaskCallables.REJECT_TASK) {
      txExecute = api.tx[Pallets.TASK][actionType](
        ...transformedPayloadReject
      );
    }

    if (actionType === TaskCallables.CREATE_TASK) {
      txExecute = api.tx[Pallets.TASK][actionType](
        ...transformedPayloadForCreate
      );
    }

    if (actionType === TaskCallables.START_TASK) {
      txExecute = api.tx[Pallets.TASK][TaskCallables.START_TASK](
        ...transformedPayloadOnlyTaskId
      );
    }

    if (actionType === TaskCallables.COMPLETE_TASK) {
      txExecute = api.tx[Pallets.TASK][TaskCallables.COMPLETE_TASK](
        ...transformedPayloadOnlyTaskId
      );
    }

    if (actionType === TaskCallables.REMOVE_TASK) {
      txExecute = api.tx[Pallets.TASK][TaskCallables.REMOVE_TASK](
        ...transformedPayloadOnlyTaskId
      );
    }

    const transactionResponseHandler = (response: any) => {
      let txFailed = false;
      let failureText: string = '';

      // TODO: better error handling;
      if (response.dispatchError) {
        response.events
          // find/filter for failed events
          .filter(({ event }: any) =>
            api.events.system.ExtrinsicFailed.is(event)
          )
          // we know that data for system.ExtrinsicFailed is
          // (dispatchError, dispatchInfo)
          .forEach(({ event: { data: [error] } }: any) => {
            if (error.isModule) {
              // for module errors, we have the section indexed, lookup
              const decoded = api.registry.findMetaError(error.asModule)
              const { docs, method, section } = decoded
              // console.log(`${section}.${method}: ${docs.join(' ')}`)

              txFailed = true
              failureText = `${docs.join(' ')}`
            } else {
              // Other, CannotLookup, BadOrigin, no extra info
              // console.log(error.toString())
              txFailed = true
              failureText = error.toString();
            }
          })
      }



      if (response.status?.isFinalized) {
        // @TODO - do this only if tasks is not prepared variety (meaning not calling allTaskEntries)
        // getAllOwnedTasks();
        getAllTaskEntries();
      }

      if (response.status?.isInBlock) {
        setLoading({ type: LoadingTypes.TASKS, value: false, message: createLoadingMessage() });
        createSnackbarMessage(enqueueSnackbar, MessageTiming.FINAL, Pallets.TASK, actionType, txFailed ? TransactionStatus.FAIL : TransactionStatus.SUCCESS, failureText)
      }
    };

    const unsub = await txExecute
      .signAndSend(fromAcct, transactionResponseHandler);

    setUnsub(() => unsub);
  };

  const taskAction = async (actionType: ActionType, taskPayload: TaskPayload, enqueueSnackbar: Function) => {
    if (typeof unsub === 'function') {
      unsub();
      setUnsub(null);
    }

    setLoading({ type: LoadingTypes.TASKS, value: true, message: createLoadingMessage(LoadingTypes.TASKS, actionType) });
    createSnackbarMessage(enqueueSnackbar, MessageTiming.INIT, Pallets.TASK, actionType)
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
