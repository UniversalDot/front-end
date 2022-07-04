// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
// universaldot
import UserQuickInfo from 'src/components/universaldot/UserQuickInfo';
import Funds from 'src/components/universaldot/Funds';
import ProfileConfiguration from 'src/components/universaldot/ProfileConfiguration';

// ----------------------------------------------------------------------

export default function Profile() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Profile">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Profile
        </Typography>
        <UserQuickInfo />
        <Funds />
        <ProfileConfiguration />
      </Container>
    </Page>
  );
}
