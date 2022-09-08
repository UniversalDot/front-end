import { noCase } from 'change-case';
import { useState, useEffect } from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';

import { useSubstrateState } from '../../../substrate-lib';
// ----------------------------------------------------------------------

// Events to be filtered from feed
const FILTERED_EVENTS = [
  'system:ExtrinsicSuccess:: (phase={"ApplyExtrinsic":0})',
  'system:ExtrinsicSuccess:: (phase={"ApplyExtrinsic":1})',
];

const eventName = (ev: any) => `${ev.section}:${ev.method}`;
const eventParams = (ev: any) => JSON.stringify(ev.data);

type EventItemType = {
  key: string;
  title: string;
  description: string;
  avatar: string | null;
  type: string | null;
  createdAt: string | null;
  isUnread: boolean;
};

export default function EventsPopover() {
  const { api } = useSubstrateState();
  const [eventFeed, setEventFeed] = useState<EventItemType[]>([]);

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
              // @TODO: Adapt the type for an event item:
              {
                key: keyNum,
                title: evName,
                description: evParams,
                avatar: null,
                type: null,
                createdAt: 'Today',
                isUnread: true,
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

  const totalUnread = eventFeed.filter(
    (eventItem: EventItemType) => eventItem.isUnread === true
  ).length;

  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    setEventFeed(
      eventFeed.map((eventItem: EventItemType) => ({
        ...eventItem,
        isUnread: false,
      }))
    );
  };

  return (
    <>
      <IconButtonAnimate
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnread} color="error">
          <Iconify icon="eva:bell-fill" width={20} height={20} />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Events</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnread} unread events
            </Typography>
          </Box>

          {totalUnread > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {eventFeed.map((eventItem) => (
              <EventItem key={eventItem.key} eventItem={eventItem} />
            ))}
          </List>

          {/* <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Before that
              </ListSubheader>
            }
          >
            {eventFeed.slice(1).map((eventItem) => (
              <EventItem key={eventItem.key} eventItem={eventItem} />
            ))}
          </List> */}
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

function EventItem({ eventItem }: { eventItem: EventItemType }) {
  const { title } = renderContent(eventItem);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(eventItem.isUnread && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        {/* <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar> */}
        <Iconify icon={'ic:baseline-event-repeat'} sx={{ bgcolor: 'background.neutral' }} />
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {eventItem.createdAt}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(eventItem: EventItemType) {
  const title = (
    <Typography variant="subtitle2">
      {eventItem.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(eventItem.description)}
      </Typography>
    </Typography>
  );

  if (eventItem.type === '@todoAddTypesAndIconsForTypesLaterOn') {
    return {
      avatar: (
        <img
          alt={eventItem.title}
          src="https://minimal-assets-api-dev.vercel.app/assets/icons/ic_notification_package.svg"
        />
      ),
      title,
    };
  }
  return {
    avatar: eventItem.avatar ? <img alt={eventItem.title} src={eventItem.avatar} /> : null,
    title,
  };
}
