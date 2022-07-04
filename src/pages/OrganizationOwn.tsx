// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
// universaldot
import Organizations from 'src/components/universaldot/Organizations';
// ----------------------------------------------------------------------

export default function OrganizationOwn() {
  const { themeStretch } = useSettings();

  return (
    <Page title="My organization">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          My organization
        </Typography>
        <Organizations type="own" />
      </Container>
    </Page>
  );
}
