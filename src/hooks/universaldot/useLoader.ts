import { useCallback } from 'react';
import { useSelector, useDispatch } from '../../redux/store';
import { setLoading as setLoadingAction } from '../../redux/slices/loadersSlice';

const useLoader = () => {
  const dispatch = useDispatch();
  const loadingProfile = useSelector(state => state.loaders.profile);
  const loadingTasks = useSelector(state => state.loaders.profile);

  const setLoading = useCallback(
    loadingBoolean => {
      dispatch(setLoadingAction(loadingBoolean));
    },
    [dispatch]
  );

  return {
    loadingProfile,
    loadingTasks,
    setLoading,
  };
};

export { useLoader };
