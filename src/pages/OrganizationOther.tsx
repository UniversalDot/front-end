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
import { OrganizationsList } from '../components/universaldot/DAO';
// ----------------------------------------------------------------------

export default function OrganizationOther() {
  const { themeStretch } = useSettings();

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
        <OrganizationsList />
        {/* <Organizations type="joined" /> */}
      </Container>
    </Page>
  );
}
