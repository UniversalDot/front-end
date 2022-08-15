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
import useTabs from '../../../hooks/useTabs';
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
// components
import Iconify from '../../Iconify';
import Scrollbar from '../../Scrollbar';
import { TableNoData, TableEmptyRows, TableHeadCustom, TableSelectedActions } from '../../table';
import TableRow from './TableRow';
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

const STATUS_OPTIONS = ['all', 'statusTest1', 'statusTest2'];

const ROLE_OPTIONS = ['all', 'test1', 'test2', 'test3'];

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'orgId', label: 'Org. ID', align: 'left' },
  { id: 'joinDate', label: 'Join date', align: 'left' },
  { id: 'tag', label: 'Tag', align: 'center' },
  { id: 'completedTask', label: 'Completed task', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'actions1' },
  { id: 'actions2' },
];

const TABLE_DATA = [
  {
    name: 'name1',
    orgId: 'orgId1',
    joinDate: 'joinDate1',
    tag: 'tag1',
    completedTask: 'completedTask1',
    status: 'status1',
  },
  {
    name: 'name2',
    orgId: 'orgId2',
    joinDate: 'joinDate2',
    tag: 'tag2',
    completedTask: 'completedTask2',
    status: 'status2',
  },
];

// ----------------------------------------------------------------------

export default function OrganizationsList() {
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

  const [tableData, setTableData] = useState(TABLE_DATA);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = (id: string) => {
    const deleteRow = tableData.filter((row) => row.orgId !== id);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected: string[]) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.orgId));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id: string) => {
    console.log('handleEditRow');
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  return (
    <Card>
      <Tabs
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        value={filterStatus}
        onChange={onChangeFilterStatus}
        sx={{ px: 2, bgcolor: 'background.neutral' }}
      >
        {STATUS_OPTIONS.map((tab) => (
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

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
          {selected.length > 0 && (
            <TableSelectedActions
              dense={dense}
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.orgId)
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
              headLabel={TABLE_HEAD}
              rowCount={tableData.length}
              numSelected={selected.length}
              onSort={onSort}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.orgId)
                )
              }
            />

            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.orgId}
                    row={row}
                    selected={selected.includes(row.orgId)}
                    onSelectRow={() => onSelectRow(row.orgId)}
                    onDeleteRow={() => handleDeleteRow(row.orgId)}
                    onEditRow={() => handleEditRow(row.orgId)}
                  />
                ))}

              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
              />

              <TableNoData isNotFound={isNotFound} />
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

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
  tableData,
  comparator,
  filterName,
  filterStatus,
  filterRole,
}: {
  tableData: TableData;
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus: string;
  filterRole: string;
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item: Record<string, any>) =>
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item: Record<string, any>) => item.status === filterStatus);
  }

  if (filterRole !== 'all') {
    tableData = tableData.filter((item: Record<string, any>) => item.tag === filterRole);
  }

  return tableData;
}
