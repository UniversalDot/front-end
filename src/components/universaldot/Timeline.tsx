/* eslint-disable multiline-ternary */
import { useEffect, useMemo } from 'react';
import Task from './Task';
import Events from './Events';
import { useTasks, useLoader } from '../../hooks/universaldot';

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

    return allTasksReceived.map((taskId: any, i: number) => (
      <Task id={taskId} optionsOnClick={handleOptionsOnClick} key={`task#${i}`} />
    ));
  }, [allTasksReceived, taskAction]);

  return (
    <div>
      <div>{loadingTasks || actionLoading ? 'loading' : tasks}</div>
      <Events />
    </div>
  );
};

Timeline.displayName = 'Timeline';

export default Timeline;
