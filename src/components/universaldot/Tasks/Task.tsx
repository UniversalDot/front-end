import { useState, useEffect } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
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
import { TaskCallables, TaskType, ActionType } from 'src/types';
// ----------------------------------------------------------------------

type TaskProps = {
  id: string;
  taskData?: TaskType;
};

export default function Task({ id, taskData }: TaskProps) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const { getTask, taskAction } = useTasks();
  const [data, setData] = useState<TaskType | null>(null);

  useEffect(() => {
    if (id && !taskData) {
      const handleResponse = (dataFromResponse: any) =>
        !dataFromResponse.isNone && setData({ taskId: id, ...dataFromResponse.toHuman() });

      getTask(id, handleResponse);
    }

    if (id && taskData) {
      setData(taskData);
    }
  }, [id, getTask, taskData]);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleOptionsOnClick = (actionType: ActionType, taskId: string) => {
    taskAction(actionType, taskId, enqueueSnackbar);
    handleCloseMenu();
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
