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
  toastTypes,
  loadingTypes,
} from '../../types';
// import { useToast } from './useToast';

const useTasks = () => {
  const dispatch = useDispatch();
  const { api, keyring, keyringState } = useSubstrateState();
  const [unsub, setUnsub] = useState<Function | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { selectedKeyring } = useUser();
  const { setStatus, setStatusMessage } = useStatus();
  const { setLoading } = useLoader();
  // const { toast } = useToast();

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

      if (result.isNone) {
        dispatch(setTasks([]));
      }

      dispatch(setTasks(result.toHuman()));
    },
    [dispatch, setLoading, setStatusMessage]
  );

  const getAllTasks = useCallback(() => {
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

  const signedTx = async (actionType: any, taskPayload: any) => {
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

    const transactionResponseHandler = ({ status }: any) => {
      const callStatus = status;

      if (callStatus?.isFinalized) {
        getAllTasks();
      }

      if (callStatus?.isFinalized) {
        setStatus(statusTypes.FINALIZED);
        setTimeout(() => {
          setStatus('');
        }, 5000);
      }
      if (callStatus?.isInBlock) {
        setStatus(statusTypes.IN_BLOCK);
      }

      // @TODO: transfer to new toast from template;
      // if (callStatus?.isInBlock) {
      //   if (actionType === TaskCallables.CREATE_TASK) {
      //     toast('Task created successfully!', toastTypes.SUCCESS);
      //   }

      //   if (actionType === TaskCallables.START_TASK) {
      //     toast('Task started successfully!', toastTypes.SUCCESS);
      //   }

      //   if (actionType === TaskCallables.COMPLETE_TASK) {
      //     toast('Task closed successfully!', toastTypes.SUCCESS);
      //   }

      //   if (actionType === TaskCallables.REMOVE_TASK) {
      //     toast('Task deleted successfully!', toastTypes.SUCCESS);
      //   }
      // }

      setActionLoading(false);
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

  const taskAction = async (actionType: any, taskPayload: any) => {
    if (typeof unsub === 'function') {
      unsub();
      setUnsub(null);
    }

    setStatus(statusTypes.INIT);

    // @TODO: transfer to new toast from template;
    // if (actionType === TaskCallables.CREATE_TASK) {
    //   toast('Creating task...', toastTypes.INFO);
    // }

    // if (actionType === TaskCallables.START_TASK) {
    //   toast('Initiating task...', toastTypes.INFO);
    // }

    // if (actionType === TaskCallables.COMPLETE_TASK) {
    //   toast('Closing task...', toastTypes.INFO);
    // }

    // if (actionType === TaskCallables.REMOVE_TASK) {
    //   toast('Deleting task...', toastTypes.INFO);
    // }

    setActionLoading(true);

    signedTx(actionType, taskPayload);
    dispatch(resetTask());
  };

  return {
    getTask,
    taskAction,
    actionLoading,
    populateTask,
    taskValues,
    isEditMode,
    getAllTasks,
    tasks,
    resetAllTasks,
    taskErrors,
  };
};

export { useTasks };
