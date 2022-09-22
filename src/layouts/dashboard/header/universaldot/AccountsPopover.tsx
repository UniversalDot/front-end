import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Avatar, Typography, ListItemText, ListItemAvatar, MenuItem } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import MenuPopover from '../../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../../components/animate';
// universaldot
import { useUser } from 'src/hooks/universaldot';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

// ----------------------------------------------------------------------

export default function AccountsPopover() {
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const { keyringOptions, setSelectedKeyring, selectedKeyring } = useUser();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButtonAnimate
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <Iconify icon={'eva:people-fill'} width={20} height={20} />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 320,
          '& .MuiMenuItem-root': {
            px: 1.5,
            height: ITEM_HEIGHT,
            borderRadius: 0.75,
          },
        }}
      >
        <Typography variant="h6" sx={{ p: 1.5 }}>
          Accounts <Typography component="span">({keyringOptions.length})</Typography>
        </Typography>

        <Scrollbar sx={{ height: ITEM_HEIGHT * 6 }}>
          {keyringOptions.map((account: any) => (
            <MenuItem
              key={account.key}
              onClick={() => {
                setSelectedKeyring(account);
                handleClose();
              }}
              selected={account.value === selectedKeyring.value}
            >
              <ListItemAvatar sx={{ position: 'relative' }}>
                <Avatar
                  src={
                    'https://www.slaveatanasov.com/static/e9052516b4c76a54f70d753d9b54b145/47498/sa_img.jpg'
                  }
                />
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ typography: 'subtitle2', mb: 0.25 }}
                secondaryTypographyProps={{ typography: 'caption' }}
                primary={account.text}
              />
            </MenuItem>
          ))}
        </Scrollbar>
      </MenuPopover>
    </>
  );
}
