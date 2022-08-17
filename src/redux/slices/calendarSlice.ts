import { createSlice } from '@reduxjs/toolkit';
import { EventInput } from '@fullcalendar/common';
// utils
import axios from '../../utils/axios';
// @types
import { CalendarState } from '../../@types/calendar';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState: CalendarState = {
  isLoading: false,
  error: null,
  events: [],
  isOpenModal: false,
  selectedEventId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET EVENTS
    getEventsSuccess(state, action) {
      state.isLoading = false;
      state.events = action.payload;
    },

    // CREATE EVENT
    createEventSuccess(state, action) {
      const newEvent = action.payload;
      state.isLoading = false;
      state.events = [...state.events, newEvent];
    },

    // UPDATE EVENT
    updateEventSuccess(state, action) {
      const event = action.payload;
      const updateEvent = state.events.map((_event) => {
        if (_event.id === event.id) {
          return event;
        }
        return _event;
      });

      state.isLoading = false;
      state.events = updateEvent;
    },

    // DELETE EVENT
    deleteEventSuccess(state, action) {
      const { eventId } = action.payload;
      const deleteEvent = state.events.filter((event) => event.id !== eventId);
      state.events = deleteEvent;
    },

    // SELECT EVENT
    selectEvent(state, action) {
      const eventId = action.payload;
      state.isOpenModal = true;
      state.selectedEventId = eventId;
    },

    // SELECT RANGE
    selectRange(state, action) {
      const { start, end } = action.payload;
      state.isOpenModal = true;
      state.selectedRange = { start, end };
    },

    // OPEN MODAL
    openModal(state) {
      state.isOpenModal = true;
    },

    // CLOSE MODAL
    closeModal(state) {
      state.isOpenModal = false;
      state.selectedEventId = null;
      state.selectedRange = null;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { openModal, closeModal, selectEvent } = slice.actions;

// ----------------------------------------------------------------------

// @TODO: refactor all axios calls for our real implementation;

export function getEvents() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/calendar/events');
      // dispatch(slice.actions.getEventsSuccess(response.data.events));

      const mockEvents = [
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
          allDay: false,
          textColor: '#00AB55',
          description: 'Atque eaque ducimus minima distinctio velit. Laborum et veniam officiis. Delectus ex saepe hic id laboriosam officia. Odit nostrum qui illum saepe debitis ullam. Laudantium beatae modi fugit ut. Dolores consequatur beatae nihil voluptates rem maiores.',
          start: '2022-07-28T07:30:02.884Z',
          end: '2022-07-28T09:00:02.884Z',
          title: 'Believing These 7 Myths About Event Keeps You From Growing'
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
          allDay: false,
          textColor: '#1890FF',
          description: 'Rerum eius velit dolores. Explicabo ad nemo quibusdam. Voluptatem eum suscipit et ipsum et consequatur aperiam quia. Rerum nulla sequi recusandae illum velit quia quas. Et error laborum maiores cupiditate occaecati.',
          start: '2022-08-03T02:00:02.884Z',
          end: '2022-08-03T05:30:02.884Z',
          title: 'Don\'t Waste Time! 7 Facts Until You Reach Your Event'
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
          allDay: false,
          textColor: '#54D62C',
          description: 'Et non omnis qui. Qui sunt deserunt dolorem aut velit cumque adipisci aut enim. Nihil quis quisquam nesciunt dicta nobis ab aperiam dolorem repellat. Voluptates non blanditiis. Error et tenetur iste soluta cupiditate ratione perspiciatis et. Quibusdam aliquid nam sunt et quisquam non esse.',
          start: '2022-08-12T08:00:02.884Z',
          end: '2022-08-12T12:00:02.884Z',
          title: 'How 7 Things Will Change The Way You Approach Event'
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
          allDay: false,
          textColor: '#00AB55',
          description: 'Nihil ea sunt facilis praesentium atque. Ab animi alias sequi molestias aut velit ea. Sed possimus eos. Et est aliquid est voluptatem.',
          start: '2022-08-09T08:00:02.884Z',
          end: '2022-08-09T12:00:02.884Z',
          title: 'Event Awards: 7 Reasons Why They Don\'t Work & What You Can Do About It'
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
          allDay: false,
          textColor: '#FFC107',
          description: 'Non rerum modi. Accusamus voluptatem odit nihil in. Quidem et iusto numquam veniam culpa aperiam odio aut enim. Quae vel dolores. Pariatur est culpa veritatis aut dolorem.',
          start: '2022-08-12T05:15:02.884Z',
          end: '2022-08-12T05:30:02.884Z',
          title: 'Event Doesn\'t Have To Be Hard. Read These 7 Tips'
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
          allDay: true,
          textColor: '#FF4842',
          description: 'Est enim et sit non impedit aperiam cumque animi. Aut eius impedit saepe blanditiis. Totam molestias magnam minima fugiat.',
          start: '2022-08-05T16:59:59.999Z',
          end: '2022-08-05T17:00:00.000Z',
          title: 'Event Is Your Worst Enemy. 7 Ways To Defeat It'
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
          allDay: false,
          textColor: '#04297A',
          description: 'Unde a inventore et. Sed esse ut. Atque ducimus quibusdam fuga quas id qui fuga.',
          start: '2022-08-12T07:45:02.884Z',
          end: '2022-08-12T07:50:02.884Z',
          title: 'Event On A Budget: 7 Tips From The Great Depression'
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9',
          allDay: false,
          textColor: '#1890FF',
          description: 'Eaque natus adipisci soluta nostrum dolorem. Nesciunt ipsum molestias ut aliquid natus ut omnis qui fugiat. Dolor et rem. Ut neque voluptatem blanditiis quasi ullam deleniti.',
          start: '2022-08-12T08:50:02.884Z',
          end: '2022-08-12T08:55:02.884Z',
          title: 'Knowing These 7 Secrets Will Make Your Event Look Amazing'
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b10',
          allDay: false,
          textColor: '#7A0C2E',
          description: 'Nam et error exercitationem qui voluptate optio. Officia omnis qui accusantium ipsam qui. Quia sequi nulla perspiciatis optio vero omnis maxime omnis ipsum. Perspiciatis consequuntur asperiores veniam dolores.',
          start: '2022-08-15T07:12:02.884Z',
          end: '2022-08-17T07:20:02.884Z',
          title: 'Master The Art Of Event With These 7 Tips'
        }
      ]

      dispatch(slice.actions.getEventsSuccess(mockEvents));

    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createEvent(newEvent: Omit<EventInput, 'id'>) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/calendar/events/new', newEvent);
      dispatch(slice.actions.createEventSuccess(response.data.event));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateEvent(
  eventId: string,
  updateEvent: Partial<{
    allDay: boolean;
    start: Date | null;
    end: Date | null;
  }>
) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/calendar/events/update', {
        eventId,
        updateEvent,
      });
      dispatch(slice.actions.updateEventSuccess(response.data.event));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteEvent(eventId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/calendar/events/delete', { eventId });
      dispatch(slice.actions.deleteEventSuccess({ eventId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function selectRange(start: Date, end: Date) {
  return async () => {
    dispatch(
      slice.actions.selectRange({
        start: start.getTime(),
        end: end.getTime(),
      })
    );
  };
}
