/* eslint-disable indent */
import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from '../../redux/store';
import { web3FromSource } from '@polkadot/extension-dapp';
import { useSubstrateState } from '../../substrate-lib';
import {
  setTasks,
  resetTasks,
} from '../../redux/slices/tasksSlice';
import { useUser } from './useUser';
import { useLoader } from './useLoader';
import { useUtils } from './useUtils';
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
import dayjs from 'dayjs';

const useTasks = () => {
  const dispatch = useDispatch();
  const { api, keyring, keyringState } = useSubstrateState();
  const [unsub, setUnsub] = useState<Function | null>(null);

  const { selectedKeyring } = useUser();
  const { setLoading, setLoadingCallable } = useLoader();
  const { getErrorInfo } = useUtils();

  const tasks = useSelector(state => state.tasks.tasks);

  const resetAllTasks = useCallback(() => dispatch(resetTasks()), [dispatch]);

  const getAllTaskEntries = useCallback(() => {
    setLoading({ type: LoadingTypes.TASKS, value: true, message: createLoadingMessage(LoadingTypes.TASKS) });

    const queryPreparedResponseHandler = (result: any[]) => {
      if (result.length === 0) {
        dispatch(setTasks([]));
      }
      dispatch(setTasks(result));
      setLoading({ type: LoadingTypes.TASKS, value: false, message: createLoadingMessage() });
    }

    if (selectedKeyring.value) {
      const query = async () => {
        const allTaskEntries = (await api.query[Pallets.TASK][TaskCallables.TASKS].entries());
        const entriesPrepared = allTaskEntries.map((entry: any[]) => {
          const entryString = entry.toString();
          let taskObject = entry[1].toHuman();

          const deadlineWithoutCommas = Number(taskObject.deadline.split(',').join(''));
          const deadlineFormatted = dayjs(deadlineWithoutCommas).isValid() ? dayjs(deadlineWithoutCommas).format('DD/MM/YYYY') : deadlineWithoutCommas;

          taskObject = {
            ...taskObject,
            deadline: deadlineFormatted,
          }

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
    dispatch
  ]);

  const getOwnedTasks = useCallback(() => {
    setLoading({ type: LoadingTypes.TASKS, value: true, message: createLoadingMessage(LoadingTypes.TASKS) });

    const handleTasksOwedResponse = (tasksOwnedIds: any) => {
      const tasksOwned = tasksOwnedIds.toHuman();
      if (tasksOwned) {
        const queryGetTask = async () => {
          const handleGetTaskResponse = (results: any) => {
            const resultsAsObjectsArray = results.map((resultOption: any, index: number) => {
              let taskObject = {
                taskId: tasksOwnedIds[index],
                ...resultOption.toHuman()
              };
              const deadlineWithoutCommas = Number(taskObject.deadline.split(',').join(''));
              const deadlineFormatted = dayjs(deadlineWithoutCommas).isValid() ? dayjs(deadlineWithoutCommas).format('DD/MM/YYYY') : deadlineWithoutCommas;

              taskObject = {
                deadline: deadlineFormatted,
              }

              return taskObject;
            })

            if (resultsAsObjectsArray.length === 0) {
              dispatch(setTasks([]));
            }
            dispatch(setTasks(resultsAsObjectsArray));
          }

          const unsub = await api.query[Pallets.TASK][TaskCallables.GET_TASK].multi(tasksOwned, (response: any) => {
            handleGetTaskResponse(response)
          });
          const cb = () => unsub;
          cb();
        };

        queryGetTask();
      }
    }

    if (selectedKeyring.value) {
      const queryTasksOwned = async () => {
        const unsub = await api.query[Pallets.TASK][TaskCallables.TASKS_OWNED](selectedKeyring.value, (response: any) => handleTasksOwedResponse(response));
        const cb = () => unsub;
        cb();
      };

      queryTasksOwned();
    }
  }, [
    selectedKeyring.value,
    api,
    setLoading,
    dispatch
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

    let txExecute;

    if (actionType === TaskCallables.ACCEPT_TASK) {
      txExecute = api.tx[Pallets.TASK][actionType](
        ...taskPayload
      );
    }

    if (actionType === TaskCallables.REJECT_TASK) {
      txExecute = api.tx[Pallets.TASK][actionType](
        ...taskPayload
      );
    }

    if (actionType === TaskCallables.CREATE_TASK) {
      txExecute = api.tx[Pallets.TASK][actionType](
        ...taskPayload
      );
    }

    if (actionType === TaskCallables.UPDATE_TASK) {
      txExecute = api.tx[Pallets.TASK][TaskCallables.UPDATE_TASK](
        ...taskPayload
      );
    }

    if (actionType === TaskCallables.START_TASK) {
      txExecute = api.tx[Pallets.TASK][TaskCallables.START_TASK](
        ...taskPayload
      );
    }

    if (actionType === TaskCallables.COMPLETE_TASK) {
      txExecute = api.tx[Pallets.TASK][TaskCallables.COMPLETE_TASK](
        ...taskPayload
      );
    }

    if (actionType === TaskCallables.REMOVE_TASK) {
      txExecute = api.tx[Pallets.TASK][TaskCallables.REMOVE_TASK](
        ...taskPayload
      );
    }

    const transactionResponseHandler = (response: any) => {
      let txFailed = false;
      let failureText: string = '';

      if (response.dispatchError) {
        const { txFailed: txFailedResult, failureText: failureTextResult } = getErrorInfo(response, api)

        txFailed = txFailedResult;
        failureText = failureTextResult;
      }

      if (response.status?.isFinalized) {

      }

      if (response.status?.isInBlock) {
        if (actionType !== TaskCallables.CREATE_TASK &&
          actionType !== TaskCallables.REJECT_TASK &&
          actionType !== TaskCallables.UPDATE_TASK &&
          actionType !== TaskCallables.START_TASK &&
          actionType !== TaskCallables.COMPLETE_TASK &&
          actionType !== TaskCallables.REMOVE_TASK
        ) {
          setLoading({ type: LoadingTypes.TASKS, value: false, message: createLoadingMessage() });
        }

        if (actionType === TaskCallables.CREATE_TASK ||
          actionType === TaskCallables.REJECT_TASK ||
          actionType === TaskCallables.UPDATE_TASK ||
          actionType === TaskCallables.START_TASK ||
          actionType === TaskCallables.COMPLETE_TASK ||
          actionType === TaskCallables.REMOVE_TASK
        ) {
          setLoadingCallable({ type: LoadingTypes.TASKS, callableType: actionType, value: false });
        }

        createSnackbarMessage(enqueueSnackbar, MessageTiming.FINAL, Pallets.TASK, actionType, txFailed ? TransactionStatus.FAIL : TransactionStatus.SUCCESS, failureText);

        // @TODO: check if I need to call getAllTaskEntries or getOwnedTasks here to repopulate with fresh data;
        // getOwnedTasks();
        getAllTaskEntries();
      }
    };

    const unsub = await txExecute.signAndSend(fromAcct, transactionResponseHandler);

    setUnsub(() => unsub);
  };

  const taskAction = async (actionType: ActionType, taskPayload: TaskPayload, enqueueSnackbar: Function) => {
    if (typeof unsub === 'function') {
      unsub();
      setUnsub(null);
    }

    // @TODO: Align all payloads to be similar in structure; 
    if (actionType === TaskCallables.CREATE_TASK) {
      taskPayload = [
        taskPayload.title,
        taskPayload.specification,
        taskPayload.budget,
        taskPayload.deadline,
        taskPayload.attachments,
        taskPayload.keywords
      ];
    }
    if (actionType === TaskCallables.ACCEPT_TASK) {
      taskPayload = [...taskPayload]
    }

    if (actionType === TaskCallables.REJECT_TASK) {
      taskPayload = [...taskPayload]
    }

    if (actionType === TaskCallables.UPDATE_TASK) {
      taskPayload = [
        taskPayload.taskId,
        taskPayload.title,
        taskPayload.specification,
        taskPayload.budget,
        taskPayload.deadline,
        taskPayload.attachments,
        taskPayload.keywords
      ]
    }

    if (actionType === TaskCallables.START_TASK) {
      taskPayload = [taskPayload]
    }

    if (actionType === TaskCallables.COMPLETE_TASK) {
      taskPayload = [taskPayload]
    }

    if (actionType === TaskCallables.REMOVE_TASK) {
      taskPayload = [taskPayload]
    }

    if (actionType !== TaskCallables.CREATE_TASK &&
      actionType !== TaskCallables.REJECT_TASK &&
      actionType !== TaskCallables.UPDATE_TASK &&
      actionType !== TaskCallables.START_TASK &&
      actionType !== TaskCallables.COMPLETE_TASK &&
      actionType !== TaskCallables.REMOVE_TASK
    ) {
      setLoading({ type: LoadingTypes.TASKS, value: true, message: createLoadingMessage(LoadingTypes.TASKS, actionType) });
    }

    if (actionType === TaskCallables.CREATE_TASK ||
      actionType === TaskCallables.REJECT_TASK ||
      actionType === TaskCallables.UPDATE_TASK ||
      actionType === TaskCallables.START_TASK ||
      actionType === TaskCallables.COMPLETE_TASK ||
      actionType === TaskCallables.REMOVE_TASK
    ) {
      setLoadingCallable({ type: LoadingTypes.TASKS, callableType: actionType, value: true });
    }

    createSnackbarMessage(enqueueSnackbar, MessageTiming.INIT, Pallets.TASK, actionType);

    signedTransaction(actionType, taskPayload, enqueueSnackbar);
  };

  return {
    taskAction,
    getAllTaskEntries,
    getOwnedTasks,
    tasks,
    resetAllTasks,
  };
};

export { useTasks };
