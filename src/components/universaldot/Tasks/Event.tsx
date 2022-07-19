import { useState } from 'react';

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
// ----------------------------------------------------------------------

export default function Event() {
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<MyAvatar />}
        title={
          <Typography variant="subtitle2" color="text.primary">
            Title
          </Typography>
        }
        subheader={
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            Subheader
          </Typography>
        }
        action={
          <MoreMenuPopup
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={
              <>
                <MenuItem>
                  <Iconify icon={'eva:download-fill'} />
                  Start
                </MenuItem>

                <MenuItem>
                  <Iconify icon={'eva:printer-fill'} />
                  Complete
                </MenuItem>

                <MenuItem>
                  <Iconify icon={'eva:share-fill'} />
                  Update
                </MenuItem>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <MenuItem sx={{ color: 'error.main' }}>
                  <Iconify icon={'eva:trash-2-outline'} />
                  Delete
                </MenuItem>
              </>
            }
          />
        }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Typography>Message</Typography>
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
