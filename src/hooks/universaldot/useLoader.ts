import { useCallback } from 'react';
import { useSelector, useDispatch } from '../../redux/store';
import { setLoading as setLoadingAction } from '../../redux/slices/loadersSlice';

const useLoader = () => {
  const dispatch = useDispatch();
  const loadingProfile = useSelector(state => state.loaders.profile);
  const loadingTasks = useSelector(state => state.loaders.profile);
  const loadingDao = useSelector(state => state.loaders.dao);
  const message = useSelector(state => state.loaders.message);

  const setLoading = useCallback(
    loadingBoolean => {
      dispatch(setLoadingAction(loadingBoolean));
    },
    [dispatch]
  );

  return {
    message,
    loadingProfile,
    loadingTasks,
    loadingDao,
    setLoading,
  };
};

export { useLoader };
