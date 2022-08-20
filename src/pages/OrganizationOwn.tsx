import { useState } from 'react';
// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
import useTabs from '../hooks/useTabs';
// routes
import { PATH_UNIVERSALDOT } from '../routes/paths';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// universaldot
import { DAOLists, DAOAnalytics, Select, Kanban } from '../components/universaldot/DAO';
// import Organizations from 'src/components/universaldot/Organizations';
import { DaoCallables } from '../types';
// ----------------------------------------------------------------------

type OrganizationOwnProps = {
  subPage: 'organizations' | 'visions' | 'members' | 'tasks';
};

const TABLE_HEAD_MY_ORG = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'owner', label: 'Owner', align: 'left' },
  { id: 'actions' },
  { id: 'expandRow' },
];

const TABLE_DATA_MY_ORG = [
  {
    name: 'name1',
    owner: 'owner1',
    expandedContent: {
      description: 'Desc.',
      vision: 'Vision',
      createdAt: 'Created at',
      lastUpdatedAt: 'Last updated at',
      daoActions: [
        { id: DaoCallables.ADD_MEMBERS, label: 'Add members' },
        { id: DaoCallables.ADD_TASKS, label: 'Add tasks' },
        { id: DaoCallables.CREATE_VISION, label: 'Create vision' },
      ],
    },
    daoActions: [
      { id: DaoCallables.DISSOLVE_ORGANIZATION, label: 'Dissolve organization' },
      { id: DaoCallables.UPDATE_ORGANIZATION, label: 'Update organization' },
      { id: DaoCallables.TRANSFER_OWNERSHIP, label: 'Transfer ownership' },
    ],
  },
];

const TABLE_HEAD_VISIONS_MEMBERS = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'actions' },
];

const TABLE_DATA_VISIONS = [
  {
    name: 'name1',
    daoActions: [{ id: DaoCallables.REMOVE_VISION, label: 'Remove vision' }],
  },
];

const TABLE_DATA_MEMBERS = [
  {
    name: 'name1',
    daoActions: [{ id: DaoCallables.REMOVE_MEMBERS, label: 'Remove member' }],
  },
];

const TAB_OPTIONS = ['All'];

const SELECT_OPTIONS = ['all', 'test1', 'test2', 'test3'];

export default function OrganizationOwn({ subPage }: OrganizationOwnProps) {
  const { themeStretch } = useSettings();

  const { currentTab } = useTabs('All');

  const [selectedOption, setSelectedOption] = useState('all');

  const onOptionSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
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
        {subPage === 'tasks' && (
          <>
            <Select
              options={SELECT_OPTIONS}
              selectedOption={selectedOption}
              onOptionSelect={onOptionSelect}
            />
            <Kanban />
          </>
        )}
        {subPage === 'visions' && (
          <DAOLists
            listType="myOrganization"
            tabs={TAB_OPTIONS}
            currentTab={currentTab}
            onTabSwitch={onTabSwitch}
            listHead={TABLE_HEAD_VISIONS_MEMBERS}
            listData={TABLE_DATA_VISIONS}
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
            listData={TABLE_DATA_MEMBERS}
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
            listData={TABLE_DATA_MY_ORG}
            daoSubpage={subPage}
          />
        )}
        {/* <Organizations type="own" /> */}
      </Container>
    </Page>
  );
}
