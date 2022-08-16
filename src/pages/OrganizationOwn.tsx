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
import { DAOLists, DAOAnalytics, Select } from '../components/universaldot/DAO';
// import Organizations from 'src/components/universaldot/Organizations';
// ----------------------------------------------------------------------

type OrganizationOwnProps = {
  subPage: 'visions' | 'members' | 'tasks';
};

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'orgId', label: 'Org. ID', align: 'left' },
  { id: 'joinDate', label: 'Join date', align: 'left' },
  { id: 'tag', label: 'Tag', align: 'center' },
  { id: 'completedTask', label: 'Completed task', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'actions' },
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

const TAB_OPTIONS = ['All'];

const SELECT_OPTIONS = ['all', 'test1', 'test2', 'test3'];

export default function OrganizationOwn({ subPage }: OrganizationOwnProps) {
  const { themeStretch } = useSettings();

  const { currentTab, onChangeTab } = useTabs('All');

  const [listData, setListData] = useState(TABLE_DATA);
  const [selectedOption, setSelectedOption] = useState('all');

  const onOptionSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const onTabSwitch = (event: React.SyntheticEvent<Element, Event>, tab: string) => {
    console.log('not needed tab switch');
    return;
    // onChangeTab(event, tab);

    // if (tab === 'Joined Organization') {
    //   setListData(TABLE_DATA_1);
    // }

    // if (tab === 'Recommended Organization') {
    //   setListData(TABLE_DATA_2);
    // }
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
        <DAOAnalytics />
        {subPage === 'tasks' && (
          <Select
            options={SELECT_OPTIONS}
            selectedOption={selectedOption}
            onOptionSelect={onOptionSelect}
          />
        )}
        <DAOLists
          listType="myOrganization"
          tabs={TAB_OPTIONS}
          currentTab={currentTab}
          onTabSwitch={onTabSwitch}
          listHead={TABLE_HEAD}
          listData={listData}
          daoSubpage={subPage}
        />
        {/* <Organizations type="own" /> */}
      </Container>
    </Page>
  );
}
