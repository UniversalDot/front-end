import { useState, useEffect } from 'react';
// @mui
import { Container, Box, Button, DialogTitle, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
import useTabs from '../hooks/useTabs';
import { useUser, useDao } from '../hooks/universaldot';
// routes
import { PATH_UNIVERSALDOT } from '../routes/paths';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import Iconify from '../components/Iconify';
import { DialogAnimate } from '../components/animate';
// universaldot
import {
  DAOLists,
  DAOAnalytics,
  Select,
  Kanban,
  CreateTaskForm,
} from '../components/universaldot/DAO';
import { DaoCallables, TaskCallables } from '../types';
import { useSnackbar } from 'notistack';
// ----------------------------------------------------------------------

type OrganizationOwnProps = {
  subPage: 'organizations' | 'members' | 'tasks';
};

const TABLE_HEAD_MY_ORG = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'owner', label: 'Owner', align: 'left' },
  { id: 'actions' },
  { id: 'expandRow' },
];

const TABLE_HEAD_VISIONS_MEMBERS = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'actions' },
];

const TABLE_HEAD_TASKS = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'specification', label: 'Specification', align: 'left' },
  { id: 'budget', label: 'Budget', align: 'left' },
  { id: 'deadline', label: 'Deadline', align: 'left' },
  { id: 'attachments', label: 'Attachments', align: 'left' },
  { id: 'keywords', label: 'Keywords', align: 'left' },
  { id: 'actions' },
];

const TAB_OPTIONS = ['All'];

export default function OrganizationOwn({ subPage }: OrganizationOwnProps) {
  const { themeStretch } = useSettings();

  const { enqueueSnackbar } = useSnackbar();

  const { currentTab } = useTabs('All');

  const [selectedOption, setSelectedOption] = useState('');
  const [selectOptions, setSelectOptions] = useState([]);

  const [listDataMembers, setListDataMembers] = useState([]);
  const [listDataOwnOrganizations, setListDataOwnOrganizations] = useState([]);
  const [listDataTasks, setListDataTasks] = useState([]);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const { selectedKeyring } = useUser();
  const {
    getOwnOrganizations,
    ownOrganizations,
    getMembersOfAnOrganization,
    membersOfTheSelectedOrganization,
    daoAction,
    getOrganizationTasks,
    organizationTasks,
  } = useDao();

  useEffect(() => {
    if (selectedKeyring.value) {
      getOwnOrganizations(selectedKeyring.value);
    }
  }, [selectedKeyring.value, getOwnOrganizations]);

  useEffect(() => {
    if (ownOrganizations) {
      const mappedOptions = ownOrganizations.map((ownOrganization: any) => ownOrganization.name);
      setSelectOptions(mappedOptions);

      const tableData = ownOrganizations.map((ownOrganization: any) => ({
        id: ownOrganization.id,
        name: ownOrganization.name,
        owner: ownOrganization.owner,
        expandedContent: {
          organizationId: ownOrganization.id,
          description: ownOrganization.description,
          vision: ownOrganization.vision,
          createdAt: ownOrganization.createdTime,
          lastUpdatedAt: ownOrganization.lastUpdated,
          daoActions: [
            {
              id: DaoCallables.ADD_MEMBERS,
              label: 'Add members',
              cb: () => daoAction(DaoCallables.ADD_MEMBERS, '@TODO payload', enqueueSnackbar),
            },
            // {
            //   id: DaoCallables.ADD_TASKS,
            //   label: 'Add tasks',
            //   cb: () => daoAction(DaoCallables.ADD_TASKS, '@TODO payload', enqueueSnackbar),
            // },
            // {
            //   id: DaoCallables.CREATE_VISION,
            //   label: 'Create vision',
            //   cb: () => daoAction(DaoCallables.CREATE_VISION, '@TODO payload', enqueueSnackbar),
            // },
          ],
        },
        daoActions: [
          {
            id: DaoCallables.DISSOLVE_ORGANIZATION,
            label: 'Dissolve organization',
            cb: () =>
              daoAction(DaoCallables.DISSOLVE_ORGANIZATION, '@TODO payload', enqueueSnackbar),
          },
          {
            id: DaoCallables.UPDATE_ORGANIZATION,
            label: 'Update organization',
            cb: () => daoAction(DaoCallables.UPDATE_ORGANIZATION, '@TODO payload', enqueueSnackbar),
          },
          {
            id: DaoCallables.TRANSFER_OWNERSHIP,
            label: 'Transfer ownership',
            cb: () => daoAction(DaoCallables.TRANSFER_OWNERSHIP, '@TODO payload', enqueueSnackbar),
          },
        ],
      }));
      setListDataOwnOrganizations(tableData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownOrganizations]);

  useEffect(() => {
    if (membersOfTheSelectedOrganization) {
      const tableData = membersOfTheSelectedOrganization.map((member: any) => ({
        name: member.name,
        daoActions: [
          {
            id: DaoCallables.REMOVE_MEMBERS,
            label: 'Remove member',
            cb: () => daoAction(DaoCallables.REMOVE_MEMBERS, '@TODO payload', enqueueSnackbar),
          },
        ],
      }));
      setListDataMembers(tableData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [membersOfTheSelectedOrganization]);

  useEffect(() => {
    if (organizationTasks) {
      const tableData = organizationTasks.map((task: any) => ({
        name: task.name,
        specification: task.specification,
        budget: task.budget,
        deadline: task.deadline,
        attachments: task.attachments,
        keywords: task.keywords,
        daoActions: [
          {
            id: DaoCallables.REMOVE_TASKS,
            label: 'Remove task',
            cb: () => daoAction(DaoCallables.REMOVE_TASKS, '@TODO payload', enqueueSnackbar),
          },
          {
            id: TaskCallables.UPDATE_TASK,
            label: 'Update task',
            cb: () => daoAction(TaskCallables.UPDATE_TASK, '@TODO payload', enqueueSnackbar),
          },
          // @TODO others
        ],
      }));
      setListDataTasks(tableData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationTasks]);

  const onOptionSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    subpage: 'members' | 'tasks'
  ) => {
    setSelectedOption(event.target.value);

    const orgId = ownOrganizations.find(
      (joinedOrg: any) => joinedOrg.name === event.target.value
    ).id;

    if (orgId) {
      if (subpage === 'members') {
        getMembersOfAnOrganization(orgId, DaoCallables.MEMBERS, enqueueSnackbar);
      }

      if (subpage === 'tasks') {
        getOrganizationTasks(orgId, DaoCallables.ORGANIZATION_TASKS, enqueueSnackbar);
      }
    }
  };

  const onTabSwitch = (event: React.SyntheticEvent<Element, Event>, tab: string) => {
    console.log('not needed tab switch');
    return;
  };

  return (
    <Page title="My organization">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="DAO"
          links={[
            { name: 'Organization', href: PATH_UNIVERSALDOT.dao.root },
            { name: 'My organization' },
            { name: subPage },
          ]}
        />
        {/* <DAOAnalytics /> */}
        {selectOptions && subPage === 'members' && (
          <Select
            options={selectOptions}
            selectedOption={selectedOption}
            onOptionSelect={(event) => onOptionSelect(event, 'members')}
          />
        )}
        {selectOptions && subPage === 'tasks' && (
          <Box display="flex" alignItems="center" width="100%">
            <Select
              options={selectOptions}
              selectedOption={selectedOption}
              onOptionSelect={(event) => onOptionSelect(event, 'tasks')}
            />
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              onClick={() => setIsOpenModal(true)}
            >
              Add task
            </Button>
          </Box>
        )}
        {/* {subPage === 'tasks' && <Kanban />} */}
        {subPage === 'tasks' && (
          <DAOLists
            listType="myOrganization"
            tabs={TAB_OPTIONS}
            currentTab={currentTab}
            onTabSwitch={onTabSwitch}
            listHead={TABLE_HEAD_TASKS}
            listData={listDataTasks}
            daoSubpage={subPage}
          />
        )}
        {subPage === 'members' && (
          <DAOLists
            listType="myOrganization"
            tabs={TAB_OPTIONS}
            currentTab={currentTab}
            onTabSwitch={onTabSwitch}
            listHead={TABLE_HEAD_VISIONS_MEMBERS}
            listData={listDataMembers}
            daoSubpage={subPage}
          />
        )}
        {subPage === 'organizations' && (
          <DAOLists
            listType="myOrganization"
            tabs={TAB_OPTIONS}
            currentTab={currentTab}
            onTabSwitch={onTabSwitch}
            listHead={TABLE_HEAD_MY_ORG}
            listData={listDataOwnOrganizations}
            daoSubpage={subPage}
          />
        )}
        <DialogAnimate open={isOpenModal} onClose={() => setIsOpenModal(false)}>
          <DialogTitle>Add task</DialogTitle>
          <Box p="1.5rem">
            <Typography> Add task form goes here.. also fix the table data for tasks</Typography>
            <CreateTaskForm
              taskForm={
                {
                  title: 'test1',
                  specification: 'test2',
                  budget: '33312525',
                  deadline: '4445125122',
                  attachments: 'test4',
                  keywords: 'test5',
                } || {}
              }
              onCancel={() => setIsOpenModal(false)}
            />
          </Box>
        </DialogAnimate>
      </Container>
    </Page>
  );
}
