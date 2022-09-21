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
import { DAOLists } from '../components/universaldot/DAO';
import { DaoCallables } from '../types';
import { useSnackbar } from 'notistack';
// ----------------------------------------------------------------------

const TABLE_HEAD_JOIN_REC_ORG = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'owner', label: 'Owner', align: 'left' },
  { id: 'actions' },
  { id: 'expandRow' },
];

const TAB_OPTIONS = ['Joined Organization', 'Recommended Organization'];

export default function OrganizationOther() {
  const { themeStretch } = useSettings();

  const { enqueueSnackbar } = useSnackbar();

  const { currentTab, onChangeTab } = useTabs('Joined Organization');

  const [listData, setListData] = useState([]);

  const { selectedKeyring } = useUser();
  const { getJoinedOrganizations, joinedOrganizations, daoAction } = useDao();

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
        daoActions: [
          {
            id: DaoCallables.UNSIGN_VISION,
            label: 'Leave organization',
            cb: () => daoAction(DaoCallables.UNSIGN_VISION, '@TODO payload', enqueueSnackbar),
          },
        ],
      }));
      setListData(tableData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        daoActions: [
          {
            id: DaoCallables.UNSIGN_VISION,
            label: 'Leave organization',
            cb: () => daoAction(DaoCallables.UNSIGN_VISION, '@TODO payload', enqueueSnackbar),
          },
        ],
      }));
      setListData(tableData);
    }

    if (tab === 'Recommended Organization') {
      const tableData = joinedOrganizations.map((joinedOrganization: any) => ({
        id: joinedOrganization.id,
        name: 'Mock name',
        owner: 'Mock owner',
        expandedContent: {
          description: 'Mock desc.',
          vision: 'Mock vision',
          createdAt: 'Mock created at',
          lastUpdatedAt: 'Mock last updated at',
        },
        daoActions: [
          {
            id: DaoCallables.SIGN_VISION,
            label: 'Join organization',
            cb: () => daoAction(DaoCallables.SIGN_VISION, '@TODO payload', enqueueSnackbar),
          },
        ],
      }));
      setListData(tableData);
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
          loading={false}
        />
      </Container>
    </Page>
  );
}
