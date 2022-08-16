// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// routes
import { PATH_UNIVERSALDOT } from '../routes/paths';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// universaldot
import Organizations from 'src/components/universaldot/Organizations';
// ----------------------------------------------------------------------

type OrganizationOwnProps = {
  subPage: 'visions' | 'members' | 'tasks';
};

export default function OrganizationOwn({ subPage }: OrganizationOwnProps) {
  const { themeStretch } = useSettings();

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
        <Organizations type="own" />
      </Container>
    </Page>
  );
}
