import { useCallback } from 'react';
import { useSelector, useDispatch } from '../../redux/store';
import { setLoading as setLoadingAction, setLoadingCallable as setLoadingCallableActions } from '../../redux/slices/loadersSlice';

const useLoader = () => {
  const dispatch = useDispatch();
  const loadingProfile = useSelector(state => state.loaders.profile);
  const loadingTasks = useSelector(state => state.loaders.profile);
  const loadingDao = useSelector(state => state.loaders.dao);
  const message = useSelector(state => state.loaders.message);

  const loadingProfileCreateProfile = useSelector(state => state.loaders.callablesLoadingStates.profile.createProfile);
  const loadingProfileUpdateProfile = useSelector(state => state.loaders.callablesLoadingStates.profile.updateProfile);
  const loadingProfileRemoveProfile = useSelector(state => state.loaders.callablesLoadingStates.profile.removeProfile);

  const loadingTasksCreateTask = useSelector(state => state.loaders.callablesLoadingStates.tasks.createTask);
  const loadingTasksUpdateTask = useSelector(state => state.loaders.callablesLoadingStates.tasks.updateTask);
  const loadingTasksRemoveTask = useSelector(state => state.loaders.callablesLoadingStates.tasks.removeTask);
  const loadingTasksStartTask = useSelector(state => state.loaders.callablesLoadingStates.tasks.startTask);
  const loadingTasksCompleteTask = useSelector(state => state.loaders.callablesLoadingStates.tasks.completeTask);
  const loadingTasksAcceptTask = useSelector(state => state.loaders.callablesLoadingStates.tasks.acceptTask);
  const loadingTasksRejectTask = useSelector(state => state.loaders.callablesLoadingStates.tasks.rejectTask);

  const loadingDaoAddMembers = useSelector(state => state.loaders.callablesLoadingStates.dao.addMembers);
  const loadingDaoRemoveMembers = useSelector(state => state.loaders.callablesLoadingStates.dao.removeMembers);
  const loadingDaoAddTasks = useSelector(state => state.loaders.callablesLoadingStates.dao.addTasks);
  const loadingDaoRemoveTasks = useSelector(state => state.loaders.callablesLoadingStates.dao.removeTasks);
  const loadingDaoCreateOrganization = useSelector(state => state.loaders.callablesLoadingStates.dao.createOrganization);
  const loadingDaoDissolveOrganization = useSelector(state => state.loaders.callablesLoadingStates.dao.dissolveOrganization);
  const loadingDaoUpdateOrganization = useSelector(state => state.loaders.callablesLoadingStates.dao.updateOrganization);
  const loadingDaoTransferOwnership = useSelector(state => state.loaders.callablesLoadingStates.dao.transferOwnership);

  const setLoading = useCallback(
    payload => {
      dispatch(setLoadingAction(payload));
    },
    [dispatch]
  );

  const setLoadingCallable = useCallback(
    payload => {
      dispatch(setLoadingCallableActions(payload));
    },
    [dispatch]
  );

  return {
    message,
    loadingProfile,
    loadingTasks,
    loadingDao,
    setLoading,
    setLoadingCallable,
    loadingProfileCreateProfile,
    loadingProfileUpdateProfile,
    loadingProfileRemoveProfile,
    loadingTasksCreateTask,
    loadingTasksUpdateTask,
    loadingTasksRemoveTask,
    loadingTasksStartTask,
    loadingTasksCompleteTask,
    loadingTasksAcceptTask,
    loadingTasksRejectTask,
    loadingDaoAddMembers,
    loadingDaoRemoveMembers,
    loadingDaoAddTasks,
    loadingDaoRemoveTasks,
    loadingDaoCreateOrganization,
    loadingDaoDissolveOrganization,
    loadingDaoUpdateOrganization,
    loadingDaoTransferOwnership,
  };
};

export { useLoader };
