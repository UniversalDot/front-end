// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
// universaldot
import Timeline from '../components/universaldot/Timeline';

// ----------------------------------------------------------------------

export default function Tasks() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Tasks">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Tasks
        </Typography>
        <Timeline />
      </Container>
    </Page>
  );
}
