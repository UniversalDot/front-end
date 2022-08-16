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
import Organizations from 'src/components/universaldot/Organizations';
import { DAOLists } from '../components/universaldot/DAO';
import { useState } from 'react';
// ----------------------------------------------------------------------

const TABLE_DATA_1 = [
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

const TABLE_DATA_2 = [
  {
    name: 'naaame1',
    orgId: 'ooorgId1',
    joinDate: 'joooinDate1',
    tag: 'taaag1',
    completedTask: 'cpppompletedTask1',
    status: 'sttttatus1',
  },
  {
    name: 'naaame2',
    orgId: 'oooorgId2',
    joinDate: 'joooinDate2',
    tag: 'taaaag2',
    completedTask: 'cooompletedTask2',
    status: 'stttatus2',
  },
];

const TAB_OPTIONS = ['Joined Organization', 'Recommended Organization'];

export default function OrganizationOther() {
  const { themeStretch } = useSettings();

  const { currentTab, onChangeTab } = useTabs('Joined Organization');

  const [listData, setListData] = useState(TABLE_DATA_1);

  const onTabSwitch = (event: React.SyntheticEvent<Element, Event>, tab: string) => {
    onChangeTab(event, tab);

    if (tab === 'Joined Organization') {
      setListData(TABLE_DATA_1);
    }

    if (tab === 'Recommended Organization') {
      setListData(TABLE_DATA_2);
    }
  };

  return (
    <Page title="Other organization">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="DAO"
          links={[
            { name: 'Organization', href: PATH_UNIVERSALDOT.dao.root },
            { name: 'Other organization' },
          ]}
        />
        <DAOLists
          listType="myOrganization"
          tabs={TAB_OPTIONS}
          currentTab={currentTab}
          onTabSwitch={onTabSwitch}
          listData={listData}
        />
        {/* <Organizations type="joined" /> */}
      </Container>
    </Page>
  );
}
