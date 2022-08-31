import { useEffect, useMemo } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Stack, Grid, StackProps, Paper } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import Iconify from 'src/components/Iconify';
// universaldot
import Task from '../components/universaldot/Tasks/Task';
import Events from '../components/universaldot/Events';
// hooks universaldot
import { useTasks, useLoader } from '../hooks/universaldot';
import { TaskType } from 'src/types';

// ----------------------------------------------------------------------

const ItemBlockStyle = styled((props: StackProps) => (
  <Stack direction="row" alignItems="center" {...props} />
))({
  minWidth: 72,
  flex: '1 1',
});

export default function Tasks() {
  const { themeStretch } = useSettings();

  const { getAllTaskEntries, tasks: allTasksReceived, resetAllTasks } = useTasks();

  const { loadingTasks } = useLoader();

  useEffect(() => {
    if (!loadingTasks) {
      getAllTaskEntries();
    }
    return () => {
      resetAllTasks();
      return;
    };
  }, [getAllTaskEntries, resetAllTasks, loadingTasks]);

  // // NOTE: For unprepared tasks;
  // const tasks = useMemo(() => {
  //   if (allTasksReceived?.length === 0) {
  //     return <div>No tasks at the moment...</div>;
  //   }

  //   console.log('all tasks received', allTasksReceived);

  //   return (
  //     <Stack spacing={3}>
  //       {allTasksReceived?.map((taskId: any, i: number) => (
  //         <Task id={taskId} alreadyPrepared key={`task#${i}`} />
  //       ))}
  //     </Stack>
  //   );
  // }, [allTasksReceived]);

  // NOTE: For prepared task entries;
  const tasks = useMemo(
    () =>
      allTasksReceived?.length > 0 ? (
        <Stack spacing={3}>
          {allTasksReceived?.map((task: TaskType, i: number) => (
            <Task id={task.taskId} taskData={task} key={`task#${i}`} />
          ))}
        </Stack>
      ) : (
        <div>No tasks at the moment...</div>
      ),
    [allTasksReceived]
  );

  return (
    <Page title="Tasks">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="Tasks" />
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
              {loadingTasks ? 'Loader todo here...' : tasks}
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
