import { useState, useEffect } from 'react';

// @mui
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
//hooks
import { useTasks } from 'src/hooks/universaldot';
//types
import { TaskCallables } from 'src/types';
// ----------------------------------------------------------------------

type TaskProps = {
  id: string;
};

export default function Task({ id }: TaskProps) {
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const { getTask, taskAction } = useTasks();
  //@TODO - mocked for the moment - default is null;
  // const [data, setData] = useState<any>(null);
  const [data, setData] = useState<any>({
    title: 'Mocked title',
    description: 'Mocked subheader',
    specification: 'Mocked specification',
    budget: 'Mocked budget',
    deadline: 'Mocked deadline',
    attachments: 'Mocked attachments',
    keywords: 'Mocked keywords',
  });

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
    taskAction(actionType, taskId);
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<MyAvatar />}
        title={
          <Typography variant="subtitle2" color="text.primary">
            {data?.title}
          </Typography>
        }
        subheader={
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            {data?.description}
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
                  <Iconify icon={'eva:share-fill'} />
                  Accept
                </MenuItem>

                <MenuItem onClick={() => handleOptionsOnClick(TaskCallables.REJECT_TASK, id)}>
                  <Iconify icon={'eva:share-fill'} />
                  Reject
                </MenuItem>

                <MenuItem onClick={() => handleOptionsOnClick(TaskCallables.START_TASK, id)}>
                  <Iconify icon={'eva:download-fill'} />
                  Start
                </MenuItem>

                <MenuItem onClick={() => handleOptionsOnClick(TaskCallables.COMPLETE_TASK, id)}>
                  <Iconify icon={'eva:printer-fill'} />
                  Complete
                </MenuItem>

                <MenuItem onClick={() => handleOptionsOnClick(TaskCallables.UPDATE_TASK, id)}>
                  <Iconify icon={'eva:share-fill'} />
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
        <Typography>{data?.specification}</Typography>
        <Typography>{data?.budget}</Typography>
        <Typography>{data?.deadline}</Typography>
        <Typography>{data?.attachments}</Typography>
        <Typography>{data?.keywords}</Typography>
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
