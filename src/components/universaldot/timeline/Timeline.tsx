/* eslint-disable multiline-ternary */
import { useEffect, useMemo } from 'react';
import { Task } from '../task';
import { Events } from '../events';
import { useTasks, useLoader } from '../../../hooks/universaldot';

const Timeline = () => {
  const {
    getAllTasks,
    tasks: allTasksReceived,
    resetAllTasks,
    taskAction,
    actionLoading,
  } = useTasks();

  const { loadingTasks } = useLoader();

  useEffect(() => {
    if (!actionLoading) {
      getAllTasks();
    }
    return () => {
      resetAllTasks();
      return;
    };
  }, [actionLoading, getAllTasks, resetAllTasks]);

  const tasks = useMemo(() => {
    const handleOptionsOnClick = (actionType: any, taskId: any) => {
      taskAction(actionType, taskId);
    };

    if (allTasksReceived.length === 0) {
      return <div>No tasks at the moment...</div>;
    }

    return allTasksReceived.map((taskId, i) => (
      <Task id={taskId} optionsOnClick={handleOptionsOnClick} key={`task#${i}`} />
    ));
  }, [allTasksReceived, taskAction]);

  return (
    <>
      <div>{loadingTasks || actionLoading ? 'loading' : tasks}</div>
      <Events />
    </>
  );
};

Timeline.displayName = 'Timeline';

export { Timeline };
