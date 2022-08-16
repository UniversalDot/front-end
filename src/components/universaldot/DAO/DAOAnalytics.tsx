// @mui
import { Grid, Box } from '@mui/material';
// components

// sections
import AnalyticsWidget from './AnalyticsWidget';

// ----------------------------------------------------------------------

export default function DAOAnalytics() {
  return (
    <Box mb="2rem">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidget title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidget
            title="New Users"
            total={1352831}
            color="info"
            icon={'ant-design:apple-filled'}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidget
            title="Item Orders"
            total={1723315}
            color="warning"
            icon={'ant-design:windows-filled'}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidget
            title="Bug Reports"
            total={234}
            color="error"
            icon={'ant-design:bug-filled'}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
