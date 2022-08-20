import { useState } from 'react';
// @mui
import { Checkbox, TableRow, TableCell, MenuItem } from '@mui/material';
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

export default function TableRowGeneric({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { name, daoActions } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const rowActions = daoActions.map((daoAction: any) => {
    console.log('');
    return (
      <MenuItem
        key={daoAction.id}
        // onClick={() => {
        //   onDeleteRow();
        //   handleCloseMenu();
        // }}
      >
        <Iconify icon={'eva:edit-fill'} />
        {daoAction.label}
      </MenuItem>
    );
  });

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell>{name}</TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={rowActions}
        />
      </TableCell>
    </TableRow>
  );
}
