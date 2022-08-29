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
  daoSubpage?: 'organizations' | 'members' | 'tasks' | undefined;
};

export default function TableRowGeneric({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  daoSubpage,
}: Props) {
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const rowActions = row.daoActions.map((daoAction: any) => (
    <MenuItem
      key={daoAction.id}
      onClick={() => {
        daoAction.cb();
        handleCloseMenu();
      }}
    >
      <Iconify icon={'eva:edit-fill'} />
      {daoAction.label}
    </MenuItem>
  ));

  return (
    <>
      {!daoSubpage && (
        <TableRow hover selected={selected}>
          <TableCell padding="checkbox">
            <Checkbox checked={selected} onClick={onSelectRow} />
          </TableCell>

          <TableCell>{row.name}</TableCell>

          <TableCell align="right">
            <TableMoreMenu
              open={openMenu}
              onOpen={handleOpenMenu}
              onClose={handleCloseMenu}
              actions={rowActions}
            />
          </TableCell>
        </TableRow>
      )}
      {daoSubpage === 'tasks' && (
        <TableRow hover selected={selected}>
          <TableCell padding="checkbox">
            <Checkbox checked={selected} onClick={onSelectRow} />
          </TableCell>

          <TableCell>{row.name}</TableCell>
          <TableCell>{row.specification}</TableCell>
          <TableCell>{row.budget}</TableCell>
          <TableCell>{row.deadline}</TableCell>
          <TableCell>{row.attachments}</TableCell>
          <TableCell>{row.keywords}</TableCell>

          <TableCell align="right">
            <TableMoreMenu
              open={openMenu}
              onOpen={handleOpenMenu}
              onClose={handleCloseMenu}
              actions={rowActions}
            />
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
