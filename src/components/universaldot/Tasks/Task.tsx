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
  Button
} from '@mui/material';

import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
// components
import MyAvatar from 'src/components/MyAvatar';
import Iconify from 'src/components/Iconify';
import MoreMenuPopup from '../MoreMenuPopup';
import Label from 'src/components/Label';
//hooks
import { useTasks } from 'src/hooks/universaldot';
//types
import { TaskCallables, TaskType, ActionType, TaskStatusEnum } from 'src/types';

import windowInstance from 'src/window';

// import IPFS from "ipfs";
// import { PromiseValue } from "type-fest";

const IPFS_URL = 'https://ipfs.io/ipfs/';
// ----------------------------------------------------------------------

type TaskProps = {
  id: string;
  taskData?: TaskType;
};

export default function Task({ id, taskData }: TaskProps) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const { taskAction } = useTasks();
  const [data, setData] = useState<TaskType | null>(null);
  const [attachments, setAttachments] = useState<string[]>([]);

  const labelColor =
    data?.status === TaskStatusEnum.CREATED
      ? 'info'
      : data?.status === TaskStatusEnum.IN_PROGRESS
      ? 'warning'
      : data?.status === TaskStatusEnum.COMPLETED
      ? 'primary'
      : 'secondary';

  useEffect(() => {
    if (taskData) {
      if(taskData?.attachments !== 'None' && taskData?.attachments !== '') {
        setAttachments(JSON.parse(taskData?.attachments));
      } else {
        setAttachments([]);
      }
      setData(taskData);
    }
  }, [taskData]);

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

  const downloadFileFromIPFS = (cid: string, fileName: string) => {
    const ipfsGatewayURL = `https://ipfs.io/ipfs/${cid}`;
    fetch(ipfsGatewayURL)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = '';
        link.click();
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading file from IPFS:", error);
      });
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
              color={labelColor}
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
                <MenuItem onClick={() => handleOptionsOnClick(TaskCallables.START_TASK, id)}>
                  <Iconify icon={'gis:flag-start-b-o'} />
                  Start
                </MenuItem>

                <MenuItem onClick={() => handleOptionsOnClick(TaskCallables.COMPLETE_TASK, id)}>
                  <Iconify icon={'carbon:task-complete'} />
                  Complete
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
          <Typography variant="body2">
            {
              attachments.length !== 0 && (
                <>
                  {
                    attachments.map((cid: string, index: number) => {
                      return (
                        <IconButton onClick={() => downloadFileFromIPFS(cid, 'test.txt')} key={index} sx={{ ml: 1 }} aria-label="CloudDownloadRoundedIcon" size="small" color="primary">
                          <CloudDownloadRoundedIcon fontSize="small"/>
                        </IconButton>
                      )
                    })
                  }
                </>
              )
            }
          </Typography>
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
