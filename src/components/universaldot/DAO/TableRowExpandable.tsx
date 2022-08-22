import { useState } from 'react';
// @mui
import { Checkbox, TableRow, TableCell, MenuItem, IconButton, Collapse } from '@mui/material';
// config
import { ICON } from '../../../config';
// hooks
import { useDao } from '../../../hooks/universaldot';
// components
import Iconify from '../../Iconify';
import TableMoreMenu from './TableMoreMenu';
import { DaoCallables } from '../../../types';
import ExpandedRowContent from './ExpandedRowContent';
// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
};

export default function TableRowExpandable({ row, selected, onEditRow, onSelectRow }: Props) {
  const { name, owner, daoActions, expandedContent } = row;
  const { daoAction } = useDao();

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const [expanded, setExpanded] = useState(false);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const rowActions = daoActions.map((daoActionObject: { id: DaoCallables; label: string }) => (
    <MenuItem
      key={daoActionObject.id}
      onClick={() => {
        daoAction(daoActionObject.id);
        handleCloseMenu();
      }}
    >
      <Iconify icon={'eva:edit-fill'} />
      {daoActionObject.label}
    </MenuItem>
  ));

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>{name}</TableCell>

        <TableCell align="left">{owner}</TableCell>

        {/* <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {joinDate}
        </TableCell>

        <TableCell align="center">{tag}</TableCell>

        <TableCell align="left">{completedTask}</TableCell>

        <TableCell align="left">{status}</TableCell> */}

        <TableCell align="right">
          <TableMoreMenu
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={rowActions}
            // actions={
            //   <>
            //     <MenuItem
            //       onClick={() => {
            //         onDeleteRow();
            //         handleCloseMenu();
            //       }}
            //       sx={{ color: 'error.main' }}
            //     >
            //       <Iconify icon={'eva:trash-2-outline'} />
            //       Delete
            //     </MenuItem>
            //     <MenuItem
            //       onClick={() => {
            //         onEditRow();
            //         handleCloseMenu();
            //       }}
            //     >
            //       <Iconify icon={'eva:edit-fill'} />
            //       Edit
            //     </MenuItem>
            //   </>
            // }
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
            <ExpandedRowContent data={expandedContent} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
