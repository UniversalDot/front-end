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

const TAB_OPTIONS = ['All'];

export default function OrganizationOwn({ subPage }: OrganizationOwnProps) {
  const { themeStretch } = useSettings();

  const { currentTab } = useTabs('All');

  const [selectedOption, setSelectedOption] = useState('');
  const [selectOptions, setSelectOptions] = useState([]);

  const [listDataVisions, setListDataVisions] = useState(TABLE_DATA_VISIONS);
  const [listDataMembers, setListDataMembers] = useState([]);
  const [listDataOwnOrganizations, setListDataOwnOrganizations] = useState([]);

  const { selectedKeyring } = useUser();
  const {
    getOwnOrganizations,
    ownOrganizations,
    getMembersOfAnOrganization,
    membersOfTheSelectedOrganization,
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
          description: ownOrganization.description,
          vision: ownOrganization.vision,
          createdAt: ownOrganization.createdTime,
          lastUpdatedAt: ownOrganization.lastUpdated,
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
      }));
      setListDataOwnOrganizations(tableData);
    }
  }, [ownOrganizations]);

  useEffect(() => {
    if (membersOfTheSelectedOrganization) {
      const tableData = membersOfTheSelectedOrganization.map((member: any) => ({
        name: member.name,
        daoActions: [{ id: DaoCallables.REMOVE_MEMBERS, label: 'Remove member' }],
      }));
      setListDataMembers(tableData);
    }
  }, [membersOfTheSelectedOrganization]);

  const onOptionSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);

    const orgId = ownOrganizations.find(
      (joinedOrg: any) => joinedOrg.name === event.target.value
    ).id;

    if (orgId) {
      getMembersOfAnOrganization(orgId);
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
        {selectOptions && (subPage === 'tasks' || subPage === 'members') && (
          <Select
            options={selectOptions}
            selectedOption={selectedOption}
            onOptionSelect={onOptionSelect}
          />
        )}
        {subPage === 'tasks' && <Kanban />}
        {subPage === 'visions' && (
          <DAOLists
            listType="myOrganization"
            tabs={TAB_OPTIONS}
            currentTab={currentTab}
            onTabSwitch={onTabSwitch}
            listHead={TABLE_HEAD_VISIONS_MEMBERS}
            listData={listDataVisions}
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
        {/* <Organizations type="own" /> */}
      </Container>
    </Page>
  );
}
