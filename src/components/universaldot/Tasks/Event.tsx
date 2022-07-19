// @mui
import {
  Typography,
  ListItemButton,
  ListItemAvatar,
  // Avatar,
  ListItemText,
} from '@mui/material';
// components
import MyAvatar from 'src/components/MyAvatar';
import Iconify from 'src/components/Iconify';
// ----------------------------------------------------------------------

type EventProps = {
  title: string;
  description: string;
};

export default function Event({ title, description }: EventProps) {
  const isUnread = {
    unread: false,
  };

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(isUnread.unread && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        {/* <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar> */}
        <MyAvatar />
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            2000 days ago
          </Typography>
        }
      />
    </ListItemButton>
  );
}
