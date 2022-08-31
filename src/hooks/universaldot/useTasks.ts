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

const useTasks = () => {
  const dispatch = useDispatch();
  const { api, keyring, keyringState } = useSubstrateState();
  const [unsub, setUnsub] = useState<Function | null>(null);

  const { selectedKeyring } = useUser();
  const { setLoading } = useLoader();
  const { getErrorInfo } = useUtils();

  const tasks = useSelector(state => state.tasks.tasks);

  const resetAllTasks = useCallback(() => dispatch(resetTasks()), [dispatch]);

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
        // @TODO: check if I need to call getAllTaskEntries or getAllOwnedTasks here to repopulate with fresh data;
        // getAllOwnedTasks();
        // getAllTaskEntries();
      }

      if (response.status?.isInBlock) {
        setLoading({ type: LoadingTypes.TASKS, value: false, message: createLoadingMessage() });

        createSnackbarMessage(enqueueSnackbar, MessageTiming.FINAL, Pallets.TASK, actionType, txFailed ? TransactionStatus.FAIL : TransactionStatus.SUCCESS, failureText);
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

    setLoading({ type: LoadingTypes.TASKS, value: true, message: createLoadingMessage(LoadingTypes.TASKS, actionType) });

    createSnackbarMessage(enqueueSnackbar, MessageTiming.INIT, Pallets.TASK, actionType);

    signedTransaction(actionType, taskPayload, enqueueSnackbar);
  };

  // @TODO: not currently used; won't be needed in new version; see getAllOwnedTasks for more info;
  // const getTask = useCallback(
  //   (taskId, responseHandler) => {
  //     const query = async () => {
  //       const unsub = await api?.query[Pallets.TASK][TaskCallables.GET_TASK](
  //         taskId,
  //         responseHandler
  //       );
  //       const cb = () => unsub;
  //       cb();
  //     };

  //     query();
  //   },
  //   [api]
  // );

  // @TODO: not currently used;
  // const allOwnedTasksQueryResponseHandler = useCallback(
  //   result => {
  //     setLoading({ type: LoadingTypes.TASKS, value: false, message: createLoadingMessage() });

  //     if (result.isNone) {
  //       dispatch(setTasks([]));
  //     }

  //     dispatch(setTasks(result.toHuman()));
  //   },
  //   [dispatch, setLoading]
  // );

  // @TODO: not currently used; when need to use it refactor it and take example from getMembersOfAnOrganization and its response handler function handleMembersOfAnOrganizationResponse;
  // const getAllOwnedTasks = useCallback(() => {
  //   setLoading({ type: LoadingTypes.TASKS, value: true, message: createLoadingMessage(LoadingTypes.TASKS) });

  //   if (selectedKeyring.value) {
  //     const query = async () => {
  //       const unsub = await api.query[Pallets.TASK][TaskCallables.TASKS_OWNED](
  //         selectedKeyring.value,
  //         allOwnedTasksQueryResponseHandler
  //       );
  //       const cb = () => unsub;
  //       cb();
  //     };

  //     query();
  //   }
  // }, [
  //   selectedKeyring.value,
  //   api,
  //   allOwnedTasksQueryResponseHandler,
  //   setLoading,
  // ]);

  return {
    taskAction,
    getAllTaskEntries,
    tasks,
    resetAllTasks,
  };
};

export { useTasks };
