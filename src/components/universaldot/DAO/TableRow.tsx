import { useState } from 'react';
// @mui
import { Checkbox, TableRow, TableCell, MenuItem, IconButton, Collapse } from '@mui/material';
// config
import { ICON } from '../../../config';
// components
import Iconify from '../../Iconify';
import TableMoreMenu from './TableMoreMenu';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { name, orgId, joinDate, tag, completedTask, status } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const [expanded, setExpanded] = useState(false);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>{name}</TableCell>

        <TableCell align="left">{orgId}</TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {joinDate}
        </TableCell>

        <TableCell align="center">{tag}</TableCell>

        <TableCell align="left">{completedTask}</TableCell>

        <TableCell align="left">{status}</TableCell>

        <TableCell align="right">
          <TableMoreMenu
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={
              <>
                <MenuItem
                  onClick={() => {
                    onDeleteRow();
                    handleCloseMenu();
                  }}
                  sx={{ color: 'error.main' }}
                >
                  <Iconify icon={'eva:trash-2-outline'} />
                  Delete
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onEditRow();
                    handleCloseMenu();
                  }}
                >
                  <Iconify icon={'eva:edit-fill'} />
                  Edit
                </MenuItem>
              </>
            }
          />
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={() => setExpanded(!expanded)}>
            <Iconify
              icon={expanded ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'}
              sx={{
                width: ICON.NAVBAR_ITEM_HORIZONTAL,
                height: ICON.NAVBAR_ITEM_HORIZONTAL,
              }}
            />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            Expanded content here..
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
