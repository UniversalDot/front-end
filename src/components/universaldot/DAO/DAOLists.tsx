import { useState } from 'react';
// @mui
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Switch,
  Tooltip,
  Divider,
  TableBody,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
// hooks
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
// components
import Iconify from '../../Iconify';
// import Scrollbar from '../../Scrollbar';
import { TableNoData, TableEmptyRows, TableHeadCustom, TableSelectedActions } from '../../table';
import TableRowExpandable from './TableRowExpandable';
import TableRowGeneric from './TableRowGeneric';
import TableToolbar from './TableToolbar';

// ----------------------------------------------------------------------

type TableRowType = {
  name: string;
  orgId: string;
  joinDate: string;
  tag: string;
  completedTask: string;
  status: string;
};

type TableData = TableRowType[];

const ROLE_OPTIONS = ['all', 'test1', 'test2', 'test3'];

type ListType = 'otherOrganization' | 'myOrganization';

type OrganizationsListProps = {
  listType: ListType;
  currentTab: string;
  tabs: string[];
  listHead: any[];
  listData: TableData;
  onTabSwitch: (event: React.SyntheticEvent<Element, Event>, tab: string) => void;
  daoSubpage?: 'visions' | 'members' | 'tasks';
};

// ----------------------------------------------------------------------

export default function DAOLists({
  listType,
  tabs,
  currentTab,
  listHead,
  listData,
  onTabSwitch,
  daoSubpage,
}: OrganizationsListProps) {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const showGenericRow = listType === 'myOrganization' && daoSubpage;

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = (id: string) => {
    console.log('handleDeleteRow');

    // const deleteRow = tableData.filter((row) => row.orgId !== id);
    // setSelected([]);
    // setTableData(deleteRow);
  };

  const handleDeleteRows = (selected: string[]) => {
    console.log('handleDeleteRows');

    // const deleteRows = tableData.filter((row) => !selected.includes(row.orgId));
    // setSelected([]);
    // setTableData(deleteRows);
  };

  const handleEditRow = (id: string) => {
    console.log('handleEditRow');
  };

  const dataFiltered = applySortFilter({
    listData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!currentTab);

  return (
    <Card>
      <Tabs
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        value={currentTab}
        onChange={(event, tab) => onTabSwitch(event, tab)}
        sx={{ px: 2, bgcolor: 'background.neutral' }}
      >
        {tabs.map((tab) => (
          <Tab disableRipple key={tab} label={tab} value={tab} />
        ))}
      </Tabs>

      <Divider />

      <TableToolbar
        filterName={filterName}
        filterRole={filterRole}
        onFilterName={handleFilterName}
        onFilterRole={handleFilterRole}
        optionsRole={ROLE_OPTIONS}
      />

      {/* @TODO - Scrollbar causes lagging when expanding rows; consider removing it; adding workaround */}
      {/* <Scrollbar> */}
      <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
        {selected.length > 0 && (
          <TableSelectedActions
            dense={dense}
            numSelected={selected.length}
            rowCount={listData.length}
            onSelectAllRows={(checked) =>
              onSelectAllRows(
                checked,
                listData.map((row) => row.orgId)
              )
            }
            actions={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                  <Iconify icon={'eva:trash-2-outline'} />
                </IconButton>
              </Tooltip>
            }
          />
        )}

        <Table size={dense ? 'small' : 'medium'}>
          <TableHeadCustom
            order={order}
            orderBy={orderBy}
            headLabel={listHead}
            rowCount={listData.length}
            numSelected={selected.length}
            onSort={onSort}
            onSelectAllRows={(checked) =>
              onSelectAllRows(
                checked,
                listData.map((row) => row.orgId)
              )
            }
          />

          <TableBody>
            {dataFiltered
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) =>
                showGenericRow ? (
                  <TableRowGeneric
                    key={row.orgId}
                    row={row}
                    selected={selected.includes(row.orgId)}
                    onSelectRow={() => onSelectRow(row.orgId)}
                    onDeleteRow={() => handleDeleteRow(row.orgId)}
                    onEditRow={() => handleEditRow(row.orgId)}
                  />
                ) : (
                  <TableRowExpandable
                    key={row.orgId}
                    row={row}
                    selected={selected.includes(row.orgId)}
                    onSelectRow={() => onSelectRow(row.orgId)}
                    onDeleteRow={() => handleDeleteRow(row.orgId)}
                    onEditRow={() => handleEditRow(row.orgId)}
                  />
                )
              )}

            <TableEmptyRows
              height={denseHeight}
              emptyRows={emptyRows(page, rowsPerPage, listData.length)}
            />

            <TableNoData isNotFound={isNotFound} />
          </TableBody>
        </Table>
      </TableContainer>
      {/* </Scrollbar> */}

      <Box sx={{ position: 'relative' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />

        <FormControlLabel
          control={<Switch checked={dense} onChange={onChangeDense} />}
          label="Dense"
          sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
        />
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({
  listData,
  comparator,
  filterName,
  filterRole,
}: {
  listData: TableData;
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterRole: string;
}) {
  const stabilizedThis = listData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  let returedListData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    returedListData = returedListData.filter(
      (item: Record<string, any>) =>
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterRole !== 'all') {
    returedListData = returedListData.filter(
      (item: Record<string, any>) => item.tag === filterRole
    );
  }

  return returedListData;
}
