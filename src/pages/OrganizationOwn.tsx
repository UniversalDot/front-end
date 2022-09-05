import { useState, useEffect } from 'react';
// @mui
import { Container, Box, Button, DialogTitle } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
import useTabs from '../hooks/useTabs';
import { useUser, useDao, useTasks } from '../hooks/universaldot';
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
  // DAOAnalytics,
  Select,
  // Kanban,
  CreateTaskForm,
  AddTaskToOrganizationForm,
  RejectTaskForm,
  OrganizationUpdateForm,
  OrganizationTransferOwnershipForm,
} from '../components/universaldot/DAO';
import { DaoCallables, TaskCallables, TaskStatusEnum } from '../types';
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
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'actions' },
];

const defaultTaskFormData = {
  title: '',
  specification: '',
  budget: '',
  deadline: '',
  attachments: '',
  keywords: '',
};

const defaultAddTaskToOrganizationFormData = {
  organizationId: '',
  taskId: '',
};

const defaultRejectTaskFormData = {
  feedback: '',
};

const defaultOrganizationFormData = {
  name: '',
  description: '',
  vision: '',
};

const defaultOrganizationTransferOwnershipFormData = {
  newOwnerId: '',
};

const TAB_OPTIONS = ['All'];

export default function OrganizationOwn({ subPage }: OrganizationOwnProps) {
  const { themeStretch } = useSettings();

  const { enqueueSnackbar } = useSnackbar();

  const { currentTab } = useTabs('All');

  const { taskAction } = useTasks();

  const [selectedOption, setSelectedOption] = useState('');
  const [selectOptions, setSelectOptions] = useState([]);

  const [listDataMembers, setListDataMembers] = useState([]);
  const [listDataOwnOrganizations, setListDataOwnOrganizations] = useState([]);
  const [listDataTasks, setListDataTasks] = useState([]);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState<
    | 'addToOrg'
    | 'createTask'
    | 'updateTask'
    | 'rejectFeedback'
    | 'updateOrganization'
    | 'transferOwnershipOrganization'
  >('createTask');
  const [taskIdInEdit, setTaskIdInEdit] = useState<string>('');
  const [taskIdToReject, setTaskIdToReject] = useState<string>('');

  const [taskFormData, setTaskFormData] = useState(defaultTaskFormData);
  const [addTaskToOrganizationFormData] = useState(defaultAddTaskToOrganizationFormData);
  const [rejectTaskFormData] = useState(defaultRejectTaskFormData);

  const [organizationFormData, setOrganizationFormData] = useState(defaultOrganizationFormData);
  const [organizationTransferOwnershipFormData] = useState(
    defaultOrganizationTransferOwnershipFormData
  );

  const [organizationIdInUse, setOrganizationIdInUse] = useState<string>('');

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
          ],
        },
        daoActions: [
          {
            id: DaoCallables.DISSOLVE_ORGANIZATION,
            label: 'Dissolve organization',
            cb: () =>
              daoAction(DaoCallables.DISSOLVE_ORGANIZATION, ownOrganization.id, enqueueSnackbar),
          },
          {
            id: DaoCallables.UPDATE_ORGANIZATION,
            label: 'Update organization',
            cb: () => {
              setIsOpenModal(true);
              setModalType('updateOrganization');
              setOrganizationIdInUse(ownOrganization.id);
              setOrganizationFormData({
                name: ownOrganization.name,
                description: ownOrganization.description,
                vision: ownOrganization.vision,
              });
            },
          },
          {
            id: DaoCallables.TRANSFER_OWNERSHIP,
            label: 'Transfer ownership',
            cb: () => {
              setIsOpenModal(true);
              setOrganizationIdInUse(ownOrganization.id);
              setModalType('transferOwnershipOrganization');
            },
          },
        ],
      }));
      setListDataOwnOrganizations(tableData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownOrganizations]);

  useEffect(() => {
    if (membersOfTheSelectedOrganization && organizationIdInUse) {
      const tableData = membersOfTheSelectedOrganization.map((member: any) => ({
        name: member.name,
        daoActions: [
          {
            id: DaoCallables.REMOVE_MEMBERS,
            label: 'Remove member',
            cb: () =>
              daoAction(
                DaoCallables.REMOVE_MEMBERS,
                [organizationIdInUse, member.owner],
                enqueueSnackbar
              ),
          },
        ],
      }));
      setListDataMembers(tableData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [membersOfTheSelectedOrganization, organizationIdInUse]);

  useEffect(() => {
    if (organizationTasks) {
      const tableData = organizationTasks.map((task: any) => ({
        name: task.title,
        specification: task.specification,
        budget: task.budget,
        deadline: task.deadline,
        attachments: task.attachments,
        keywords: task.keywords,
        status: task.status,
        daoActions: [
          {
            id: DaoCallables.REMOVE_TASKS,
            label: 'Remove task',
            cb: () =>
              daoAction(DaoCallables.REMOVE_TASKS, [task.organizationId, task.id], enqueueSnackbar),
          },
          {
            id: TaskCallables.UPDATE_TASK,
            label: 'Update task',
            cb: () => {
              setIsOpenModal(true);
              setModalType('updateTask');
              setTaskIdInEdit(task.id);
              setTaskFormData({
                title: task.title,
                specification: task.specification,
                budget: task.budget.replaceAll(',', ''),
                deadline: task.deadline.replaceAll(',', ''),
                attachments: task.attachments,
                keywords: task.keywords,
              });
            },
          },
          {
            id: TaskCallables.ACCEPT_TASK,
            label: 'Accept task',
            cb: () => taskAction(TaskCallables.ACCEPT_TASK, [task.id], enqueueSnackbar),
            isHidden: task.status !== TaskStatusEnum.COMPLETED ? true : false,
          },
          {
            id: TaskCallables.REJECT_TASK,
            label: 'Reject task',
            cb: () => {
              setIsOpenModal(true);
              setModalType('rejectFeedback');
            },
            isHidden: task.status !== TaskStatusEnum.COMPLETED ? true : false,
          },
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

    setOrganizationIdInUse(orgId);

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

  const createTaskCleanup = () => {
    setIsOpenModal(false);
    setTaskFormData(defaultTaskFormData);
  };

  const updateTaskCleanup = () => {
    setIsOpenModal(false);
    setModalType('createTask');
    setTaskIdInEdit('');
    setTaskFormData(defaultTaskFormData);
  };

  const addTaskToOrganizationCleanup = () => {
    setIsOpenModal(false);
  };
  const rejectTaskCleanup = () => {
    setIsOpenModal(false);
    setTaskIdToReject('');
  };
  const organizationUpdateAndTransferOwnershipCleanup = () => {
    setIsOpenModal(false);
    setOrganizationIdInUse('');
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
              onClick={() => {
                setIsOpenModal(true);
                setModalType('addToOrg');
              }}
              style={{ marginRight: '1rem' }}
            >
              Add task to organization
            </Button>
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              onClick={() => {
                setIsOpenModal(true);
                setModalType('createTask');
              }}
            >
              Create task
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
          <DialogTitle>
            {modalType === 'createTask'
              ? 'Create task'
              : modalType === 'updateTask'
              ? 'Update task'
              : modalType === 'rejectFeedback'
              ? 'Rejection feedback'
              : modalType === 'updateOrganization'
              ? 'Update organization'
              : modalType === 'transferOwnershipOrganization'
              ? 'Transfer ownership of organization'
              : 'Add task to organization'}
          </DialogTitle>
          <Box p="1.5rem">
            {modalType === 'createTask' && (
              <CreateTaskForm taskForm={taskFormData || {}} onCancel={() => createTaskCleanup()} />
            )}
            {modalType === 'updateTask' && (
              <CreateTaskForm
                taskForm={taskFormData || {}}
                taskIdForEdit={taskIdInEdit}
                onCancel={() => updateTaskCleanup()}
              />
            )}
            {modalType === 'addToOrg' && (
              <AddTaskToOrganizationForm
                form={addTaskToOrganizationFormData || {}}
                onCancel={() => addTaskToOrganizationCleanup()}
              />
            )}
            {modalType === 'rejectFeedback' && (
              <RejectTaskForm
                form={rejectTaskFormData || {}}
                onCancel={() => rejectTaskCleanup()}
                taskId={taskIdToReject}
              />
            )}
            {modalType === 'updateOrganization' && (
              <OrganizationUpdateForm
                form={organizationFormData || {}}
                onCancel={() => organizationUpdateAndTransferOwnershipCleanup()}
                organizationId={organizationIdInUse}
              />
            )}
            {modalType === 'transferOwnershipOrganization' && (
              <OrganizationTransferOwnershipForm
                form={organizationTransferOwnershipFormData || {}}
                onCancel={() => organizationUpdateAndTransferOwnershipCleanup()}
                organizationId={organizationIdInUse}
              />
            )}
          </Box>
        </DialogAnimate>
      </Container>
    </Page>
  );
}
