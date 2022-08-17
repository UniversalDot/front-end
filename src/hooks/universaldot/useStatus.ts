import { useCallback } from 'react';
import { useSelector, useDispatch } from '../../redux/store';
import {
  setStatus as setStatusAction,
  setStatusMessage as setTheStatusMessage,
} from '../../redux/slices/statusSlice';

// @TODO: delete this hook when DAO refactor/porting is finished and use notistack;

const useStatus = () => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.status.status);
  const message = useSelector(state => state.status.message);
  const setStatus = useCallback(
    status => {
      dispatch(setStatusAction(status));
    },
    [dispatch]
  );
  const setStatusMessage = useCallback(
    statusMessage => {
      dispatch(setTheStatusMessage(statusMessage));
    },
    [dispatch]
  );

  return {
    status,
    message,
    setStatus,
    setStatusMessage,
  };
};

export { useStatus };
