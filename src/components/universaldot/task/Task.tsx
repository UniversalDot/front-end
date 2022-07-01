import { useEffect, useState } from 'react';
import { useTasks } from '../../../hooks/universaldot';
import { taskCallables } from '../../../types';

const Task = ({ id, optionsOnClick }: any) => {
  const { getTask } = useTasks();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const handleResponse = (dataFromResponse: any) =>
        !dataFromResponse.isNone && setData({ taskId: id, ...dataFromResponse.toHuman() });

      getTask(id, handleResponse);
    }
  }, [id, getTask]);

  const OptionsDropdown = () => {
    const trigger = (
      <button

      // onClick={() => optionsOnClick(data?.taskId)}
      />
    );

    return (
      <div>options</div>
      // <Dropdown trigger={trigger} icon={false} direction="left">
      //   <Dropdown.Menu style={{ top: '48px' }}>
      //     <Dropdown.Item
      //       text="Start"
      //       onClick={() =>
      //         optionsOnClick(taskCallables.START_TASK, data?.taskId)
      //       }
      //     />
      //     <Dropdown.Item
      //       text="Complete"
      //       onClick={() =>
      //         optionsOnClick(taskCallables.COMPLETE_TASK, data?.taskId)
      //       }
      //     />
      //     <Dropdown.Item text="Update" />
      //     <Dropdown.Divider />
      //     <Dropdown.Item
      //       icon="close"
      //       text="Delete"
      //       onClick={() =>
      //         optionsOnClick(taskCallables.REMOVE_TASK, data?.taskId)
      //       }
      //     />
      //   </Dropdown.Menu>
      // </Dropdown>
    );
  };

  return (
    <>
      <div>
        {data?.title}
        {data?.specification}
        {data?.status}
        {data?.budget}
        {data?.deadline}
        {data?.initiator}
        <OptionsDropdown />
      </div>
    </>
  );
};

Task.displayName = 'Task';

export { Task };
