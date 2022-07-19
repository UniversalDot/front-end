import { useEffect, useState } from 'react';
import { useSubstrateState } from '../../substrate-lib';
// @mui
import {
  Typography,
  IconButton,
  Box,
  Tooltip,
  Divider,
  List,
  ListSubheader,
  Button,
} from '@mui/material';
// components
import Iconify from 'src/components/Iconify';
import Scrollbar from 'src/components/Scrollbar';
import Event from 'src/components/universaldot/Tasks/Event';
// Events to be filtered from feed
const FILTERED_EVENTS = [
  'system:ExtrinsicSuccess:: (phase={"ApplyExtrinsic":0})',
  'system:ExtrinsicSuccess:: (phase={"ApplyExtrinsic":1})',
];

const eventName = (ev: any) => `${ev.section}:${ev.method}`;
const eventParams = (ev: any) => JSON.stringify(ev.data);

const Events = () => {
  const { api } = useSubstrateState();
  const [eventFeed, setEventFeed] = useState<any>([]);

  useEffect(() => {
    let unsub: any = null;
    let keyNum = 0;

    if (api?.query?.system) {
      const allEvents = async () => {
        unsub = await api.query.system.events((events: any[]) => {
          // loop through the Vec<EventRecord>
          events.forEach((record) => {
            // extract the phase, event and the event types
            const { event, phase } = record;

            // show what we are busy with
            const evHuman = event.toHuman();
            const evName = eventName(evHuman);
            const evParams = eventParams(evHuman);
            const evNamePhase = `${evName}::(phase=${phase.toString()})`;

            if (FILTERED_EVENTS.includes(evNamePhase)) return;

            setEventFeed((e: any) => [
              {
                key: keyNum,
                icon: 'bell',
                summary: evName,
                content: evParams,
              },
              ...e,
            ]);

            keyNum += 1;
          });
        });
      };

      allEvents();
    }

    return () => unsub && unsub();
  }, [api?.query?.system]);

  return api?.query?.system?.events ? (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
        <Box sx={{ flexGrow: 1 }}>
          {/* <Typography variant="subtitle1">Events</Typography> */}
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            You have 1111 unread events
          </Typography>
        </Box>

        {10000 > 0 && (
          <Tooltip title=" Mark all as read">
            <IconButton color="primary">
              <Iconify icon="eva:done-all-fill" width={20} height={20} />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Scrollbar
        // sx={{ height: { xs: 340, sm: 'auto' } }}
        sx={{ height: 500 }}
      >
        <List
          disablePadding
          subheader={
            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
              New
            </ListSubheader>
          }
        >
          {eventFeed.map((event: any, index: number) => (
            <Event
              key={`e${index}`}
              title={`${event.summary} ${event.content}`}
              description="todo-test"
            />
          ))}
        </List>

        <List
          disablePadding
          subheader={
            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
              Old
            </ListSubheader>
          }
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((event: any, index: any) => (
            <Event key={`e${index}`} title="test123" description="todo-test" />
          ))}
        </List>
      </Scrollbar>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 1 }}>
        <Button fullWidth disableRipple>
          View All
        </Button>
      </Box>
    </Box>
  ) : (
    <Box>No events at the moment...</Box>
  );
};

Events.displayName = 'Events';

export default Events;
