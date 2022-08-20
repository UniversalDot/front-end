import { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
import useTabs from '../hooks/useTabs';
import { useUser, useDao } from '../hooks/universaldot';
// routes
import { PATH_UNIVERSALDOT } from '../routes/paths';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// universaldot
// import Organizations from 'src/components/universaldot/Organizations';
import { DAOLists } from '../components/universaldot/DAO';
import { DaoCallables } from '../types';

// ----------------------------------------------------------------------

const TABLE_HEAD_JOIN_REC_ORG = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'owner', label: 'Owner', align: 'left' },
  { id: 'actions' },
  { id: 'expandRow' },
];

const TABLE_DATA_JOINED_ORG = [
  {
    name: 'name1',
    owner: 'owner1',
    expandedContent: {
      description: 'Desc.',
      vision: 'Vision',
      createdAt: 'Created at',
      lastUpdatedAt: 'Last updated at',
    },
    daoActions: [{ id: DaoCallables.UNSIGN_VISION, label: 'Leave organization' }],
  },
];

const TABLE_DATA_RECOMMENDED_ORG = [
  {
    name: 'name1',
    owner: 'owner1',
    expandedContent: {
      description: 'Desc.',
      vision: 'Vision',
      createdAt: 'Created at',
      lastUpdatedAt: 'Last updated at',
    },
    daoActions: [{ id: DaoCallables.SIGN_VISION, label: 'Join organization' }],
  },
];

const TAB_OPTIONS = ['Joined Organization', 'Recommended Organization'];

export default function OrganizationOther() {
  const { themeStretch } = useSettings();

  const { currentTab, onChangeTab } = useTabs('Joined Organization');

  const [listData, setListData] = useState(TABLE_DATA_JOINED_ORG);

  const { selectedKeyring } = useUser();
  const { getJoinedOrganizations, joinedOrganizations } = useDao();

  useEffect(() => {
    if (selectedKeyring.value) {
      getJoinedOrganizations(selectedKeyring.value);
    }
  }, [selectedKeyring.value, getJoinedOrganizations]);

  useEffect(() => {
    if (joinedOrganizations.length > 0) {
      const tableData = joinedOrganizations.map((joinedOrganization: any) => ({
        id: joinedOrganization.id,
        name: joinedOrganization.name,
        owner: joinedOrganization.owner,
        expandedContent: {
          description: joinedOrganization.description,
          vision: joinedOrganization.vision,
          createdAt: joinedOrganization.createdTime,
          lastUpdatedAt: joinedOrganization.lastUpdated,
        },
        daoActions: [{ id: DaoCallables.UNSIGN_VISION, label: 'Leave organization' }],
      }));
      setListData(tableData);
    }
  }, [joinedOrganizations]);

  const onTabSwitch = (event: React.SyntheticEvent<Element, Event>, tab: string) => {
    onChangeTab(event, tab);

    if (tab === 'Joined Organization') {
      const tableData = joinedOrganizations.map((joinedOrganization: any) => ({
        id: joinedOrganization.id,
        name: joinedOrganization.name,
        owner: joinedOrganization.owner,
        expandedContent: {
          description: joinedOrganization.description,
          vision: joinedOrganization.vision,
          createdAt: joinedOrganization.createdTime,
          lastUpdatedAt: joinedOrganization.lastUpdated,
        },
        daoActions: [{ id: DaoCallables.UNSIGN_VISION, label: 'Leave organization' }],
      }));
      setListData(tableData);
    }

    if (tab === 'Recommended Organization') {
      setListData(TABLE_DATA_RECOMMENDED_ORG);
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
          listType="otherOrganization"
          tabs={TAB_OPTIONS}
          currentTab={currentTab}
          onTabSwitch={onTabSwitch}
          listHead={TABLE_HEAD_JOIN_REC_ORG}
          listData={listData}
        />
        {/* <Organizations type="joined" /> */}
      </Container>
    </Page>
  );
}
