import { useEffect, useMemo } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Stack, Grid, StackProps, Paper } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// routes
// import { PATH_UNIVERSALDOT } from '../routes/paths';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import MyAvatar from 'src/components/MyAvatar';
import Iconify from 'src/components/Iconify';
// universaldot
import Task from '../components/universaldot/Tasks/Task';
import Events from '../components/universaldot/Events';
//hooks
import { useTasks, useLoader } from '../hooks/universaldot';

// ----------------------------------------------------------------------

const ItemBlockStyle = styled((props: StackProps) => (
  <Stack direction="row" alignItems="center" {...props} />
))({
  minWidth: 72,
  flex: '1 1',
});

export default function Tasks() {
  const { themeStretch } = useSettings();

  const { getAllTasks, tasks: allTasksReceived, resetAllTasks, actionLoading } = useTasks();

  const { loadingTasks } = useLoader();

  useEffect(() => {
    if (!actionLoading) {
      getAllTasks();
    }
    return () => {
      resetAllTasks();
      return;
    };
  }, [actionLoading, getAllTasks, resetAllTasks]);

  // @TODO - uncomment when available tasks to test;
  const tasks = useMemo(() => {
    if (allTasksReceived.length === 0) {
      return <div>No tasks at the moment...</div>;
    }

    return (
      <Stack spacing={3}>
        {allTasksReceived.map((taskId: any, i: number) => (
          <Task id={taskId} key={`task#${i}`} />
        ))}
      </Stack>
    );
  }, [allTasksReceived]);

  // @TODO - mocked response for the moment;
  // const tasks = useMemo(
  //   () => (
  //     <Stack spacing={3}>
  //       {[1, 2, 3, 4].map((taskId: any, i: number) => (
  //         <Task id={taskId} key={`task#${i}`} />
  //       ))}
  //     </Stack>
  //   ),
  //   []
  // );

  return (
    <Page title="Tasks">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Tasks"
          // links={[
          //   { name: 'Tasks', href: PATH_UNIVERSALDOT.tasks.root },
          //   // { name: 'Subtext' },
          // ]}
        />
        {/* <Timeline /> */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4 }} elevation={4}>
              <ItemBlockStyle sx={{ minWidth: 120, marginBottom: '2rem' }}>
                {/* <Image disabledEffect alt={country.name} src={country.flag} sx={{ width: 28, mr: 1 }} /> */}
                <Iconify icon={'bi:list-task'} sx={{ marginRight: '1rem' }} />
                <Typography variant="subtitle1" color="text.primary">
                  Upcoming Tasks
                </Typography>
              </ItemBlockStyle>
              {loadingTasks || actionLoading ? 'Loader todo here...' : tasks}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4 }} elevation={4}>
              <ItemBlockStyle sx={{ minWidth: 120, marginBottom: '2rem' }}>
                <Iconify icon={'ic:baseline-event-repeat'} sx={{ marginRight: '1rem' }} />
                <Typography variant="subtitle1" color="text.primary">
                  Events
                </Typography>
              </ItemBlockStyle>
              <Events />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
