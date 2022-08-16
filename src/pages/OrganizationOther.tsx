// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
// universaldot
import Organizations from 'src/components/universaldot/Organizations';
// ----------------------------------------------------------------------

export default function OrganizationOther() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Other organization">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Other organization
        </Typography>
        <Organizations type="joined" />
      </Container>
    </Page>
  );
}
