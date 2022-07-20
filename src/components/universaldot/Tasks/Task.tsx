import { useState, useEffect } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';

import {
  Card,
  Typography,
  Box,
  CardHeader,
  IconButton,
  Stack,
  MenuItem,
  Divider,
} from '@mui/material';
// components
import MyAvatar from 'src/components/MyAvatar';
import Iconify from 'src/components/Iconify';
import MoreMenuPopup from '../MoreMenuPopup';
import Label from 'src/components/Label';
//hooks
import { useTasks } from 'src/hooks/universaldot';
//types
import { TaskCallables } from 'src/types';
// ----------------------------------------------------------------------

type TaskProps = {
  id: string;
};

enum TaskStatusEnum {
  CREATED = 'Created',
  IN_PROGRESS = 'InProgress',
  COMPLETED = 'Completed',
  ACCEPTED = 'Accepted',
}

type TaskStatus =
  | TaskStatusEnum.CREATED
  | TaskStatusEnum.IN_PROGRESS
  | TaskStatusEnum.COMPLETED
  | TaskStatusEnum.ACCEPTED;

type TaskType = {
  title: string;
  specification: string;
  initiator: string;
  volunteer: string;
  currentOwner: string;
  status: TaskStatus;
  budget: number;
  deadline: number;
  attachments: string;
  keywords: string;
  feedback: string;
  createdAt: number;
  updatedAt: number;
  completedAt: number;
};

export default function Task({ id }: TaskProps) {
  const theme = useTheme();

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const { getTask, taskAction } = useTasks();
  const [data, setData] = useState<TaskType | null>(null);
  console.log('data/task', data);

  useEffect(() => {
    if (id) {
      const handleResponse = (dataFromResponse: any) =>
        !dataFromResponse.isNone && setData({ taskId: id, ...dataFromResponse.toHuman() });

      getTask(id, handleResponse);
    }
  }, [id, getTask]);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleOptionsOnClick = (actionType: any, taskId: any) => {
    console.log('actionType', actionType);
    console.log('taskId', taskId);
    taskAction(actionType, taskId);
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<MyAvatar />}
        title={
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle2" color="text.primary">
              {data?.title}
            </Typography>
            <Label
              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
              // warning - error - success
              color={'success'}
              sx={{ marginLeft: '1rem' }}
            >
              {data?.status}
            </Label>
          </Box>
        }
        subheader={
          // <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
          //   {data?.status}
          // </Typography>
          // <Label
          //   variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          //   // warning - error - success
          //   color={'success'}
          // >
          //   {data?.status}
          // </Label>
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            Created at: {data?.createdAt}
          </Typography>
        }
        action={
          <MoreMenuPopup
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={
              <>
                <MenuItem onClick={() => handleOptionsOnClick(TaskCallables.ACCEPT_TASK, id)}>
                  <Iconify icon={'eva:checkmark-fill'} />
                  Accept
                </MenuItem>

                <MenuItem onClick={() => handleOptionsOnClick(TaskCallables.REJECT_TASK, id)}>
                  <Iconify icon={'eva:close-circle-outline'} />
                  Reject
                </MenuItem>

                <MenuItem onClick={() => handleOptionsOnClick(TaskCallables.START_TASK, id)}>
                  <Iconify icon={'gis:flag-start-b-o'} />
                  Start
                </MenuItem>

                <MenuItem onClick={() => handleOptionsOnClick(TaskCallables.COMPLETE_TASK, id)}>
                  <Iconify icon={'carbon:task-complete'} />
                  Complete
                </MenuItem>

                <MenuItem onClick={() => handleOptionsOnClick(TaskCallables.UPDATE_TASK, id)}>
                  <Iconify icon={'ic:baseline-update'} />
                  Update
                </MenuItem>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <MenuItem
                  sx={{ color: 'error.main' }}
                  onClick={() => handleOptionsOnClick(TaskCallables.REMOVE_TASK, id)}
                >
                  <Iconify icon={'eva:trash-2-outline'} />
                  Delete
                </MenuItem>
              </>
            }
          />
        }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Divider sx={{ borderStyle: 'solid' }} />
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Specification
          </Typography>
          <Typography variant="body2">{data?.specification}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Budget
          </Typography>
          <Typography variant="body2">{data?.budget}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Deadline
          </Typography>
          <Typography variant="body2">{data?.deadline}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Attachments
          </Typography>
          <Typography variant="body2">{data?.attachments}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Keywords
          </Typography>
          <Typography variant="body2">{data?.keywords}</Typography>
        </Stack>
        {/* <Divider sx={{ borderStyle: 'solid' }} /> */}
        <Stack direction="row" alignItems="center">
          <Box sx={{ flexGrow: 1 }} />
          <IconButton>
            <Iconify icon={'eva:message-square-fill'} width={20} height={20} />
          </IconButton>
          <IconButton>
            <Iconify icon={'eva:share-fill'} width={20} height={20} />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
}
