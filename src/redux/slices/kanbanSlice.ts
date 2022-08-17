import { createSlice } from '@reduxjs/toolkit';
import omit from 'lodash/omit';
// utils
import axios from '../../utils/axios';
// @types
import { KanbanCard, KanbanColumn } from '../../@types/kanban';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

function objFromArray<Type extends Record<string, any>>(array: Type[], key: string = 'id') {
  return array.reduce<Record<string, Type>>((accumulator, current) => {
    accumulator[current[key]] = current;
    return accumulator;
  }, {});
}

type InitialState = {
  isLoading: boolean;
  error: Error | string | null;
  board: {
    cards: Record<string, KanbanCard>;
    columns: Record<string, KanbanColumn>;
    columnOrder: string[];
  };
};

const initialState: InitialState = {
  isLoading: false,
  error: null,
  board: {
    cards: {},
    columns: {},
    columnOrder: [],
  },
};

const slice = createSlice({
  name: 'kanban',
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

    // GET BOARD
    getBoardSuccess(state, action) {
      state.isLoading = false;
      const board = action.payload;

      const cards = objFromArray<KanbanCard>(board.cards);
      const columns = objFromArray<KanbanColumn>(board.columns);
      const { columnOrder } = board;
      state.board = {
        cards,
        columns,
        columnOrder,
      };
    },

    // CREATE NEW COLUMN
    createColumnSuccess(state, action) {
      const newColumn = action.payload;
      state.isLoading = false;
      state.board.columns = {
        ...state.board.columns,
        [newColumn.id]: newColumn,
      };
      state.board.columnOrder.push(newColumn.id);
    },

    persistCard(state, action) {
      const columns = action.payload;
      state.board.columns = columns;
    },

    persistColumn(state, action) {
      state.board.columnOrder = action.payload;
    },

    addTask(state, action) {
      const { card, columnId } = action.payload;

      state.board.cards[card.id] = card;
      state.board.columns[columnId].cardIds.push(card.id);
    },

    deleteTask(state, action) {
      const { cardId, columnId } = action.payload;

      state.board.columns[columnId].cardIds = state.board.columns[columnId].cardIds.filter(
        (id) => id !== cardId
      );

      state.board.cards = omit(state.board.cards, [cardId]);
    },

    // UPDATE COLUMN
    updateColumnSuccess(state, action) {
      const column = action.payload;

      state.isLoading = false;
      state.board.columns[column.id] = column;
    },

    // DELETE COLUMN
    deleteColumnSuccess(state, action) {
      const { columnId } = action.payload;
      const deletedColumn = state.board.columns[columnId];

      state.isLoading = false;
      state.board.columns = omit(state.board.columns, [columnId]);
      state.board.cards = omit(state.board.cards, [...deletedColumn.cardIds]);
      state.board.columnOrder = state.board.columnOrder.filter((c) => c !== columnId);
    },
  },
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

// ----------------------------------------------------------------------

export function getBoard() {
  // return async () => {
  //   dispatch(slice.actions.startLoading());
  //   try {
  //     const response = await axios.get('/api/kanban/board');

  //     dispatch(slice.actions.getBoardSuccess(response.data.board));
  //     dispatch(slice.actions.getBoardSuccess(kanbanBoard));
  //   } catch (error) {
  //     dispatch(slice.actions.hasError(error));
  //   }
  // };

  const kanbanBoard = {
    cards: [{
      id: 'deb02f04-9cf8-4f1e-97e0-2fbda84cc6b3',
      name: 'Call with sales of HubSpot',
      description: 'Duis condimentum lacus finibus felis pellentesque, ac auctor nibh fermentum. Duis sed dui ante. Phasellus id eros tincidunt, dictum lorem vitae, pellentesque sem. Aenean eu enim sit amet mauris rhoncus mollis. Sed enim turpis, porta a felis et, luctus faucibus nisi. Phasellus et metus fermentum, ultrices arcu aliquam, facilisis justo. Cras nunc nunc, elementum sed euismod ut, maximus eget nibh. Phasellus condimentum lorem neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce sagittis pharetra eleifend. Suspendisse potenti.',
      assignee: [
        {
          id: '473d2720-341c-49bf-94ed-556999cf6ef7',
          avatar: 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_2.jpg',
          name: 'Lucian Obrien'
        }
      ],
      due: [
        1661262884506,
        1661349284506
      ],
      attachments: [],
      comments: [
        {
          id: 'bf87b7d7-d3d3-4718-9906-f3809b26579d',
          avatar: 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_1.jpg',
          name: 'Jayvion Simon',
          createdAt: '2022-08-17T13:54:44.506Z',
          messageType: 'text',
          message: 'Assumenda nam repudiandae rerum fugiat vel maxime.'
        },
        {
          id: '24eb5032-401b-4278-8cf2-af393bb41114',
          avatar: 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_2.jpg',
          name: 'Lucian Obrien',
          createdAt: '2022-08-16T12:54:44.506Z',
          messageType: 'text',
          message: 'Quis veniam aut saepe aliquid nulla.'
        },
        {
          id: '7a370842-f609-45f4-8804-c8bc19300d31',
          avatar: 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_3.jpg',
          name: 'Deja Brady',
          createdAt: '2022-08-15T11:54:44.506Z',
          messageType: 'text',
          message: 'Reprehenderit ut voluptas sapiente ratione nostrum est.'
        },
        {
          id: 'a37b5c21-72f6-45ac-8748-949715edfaec',
          avatar: 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_4.jpg',
          name: 'Harrison Stein',
          createdAt: '2022-08-14T10:54:44.506Z',
          messageType: 'image',
          message: 'https://minimal-assets-api-dev.vercel.app/assets/images/feeds/feed_7.jpg'
        },
        {
          id: 'b40727bd-5626-496c-87c3-3091da6aef61',
          avatar: 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_5.jpg',
          name: 'Reece Chung',
          createdAt: '2022-08-13T09:54:44.506Z',
          messageType: 'text',
          message: 'Quo quia sit nihil nemo doloremque et.'
        },
        {
          id: 'e0621f19-3b26-4803-b878-f284913ab0d8',
          avatar: 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_6.jpg',
          name: 'Lainey Davidson',
          createdAt: '2022-08-12T08:54:44.506Z',
          messageType: 'image',
          message: 'https://minimal-assets-api-dev.vercel.app/assets/images/feeds/feed_9.jpg'
        },
        {
          id: '9c5b2ade-8462-4078-9105-0e6d3e116db1',
          avatar: 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_7.jpg',
          name: 'Cristopher Cardenas',
          createdAt: '2022-08-11T07:54:44.506Z',
          messageType: 'text',
          message: 'Tempora officiis consequuntur architecto nostrum autem nam adipisci.'
        },
        {
          id: 'ce4e3287-57f4-4552-b71d-ee4a6a2693af',
          avatar: 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_8.jpg',
          name: 'Melanie Noble',
          createdAt: '2022-08-10T06:54:44.506Z',
          messageType: 'text',
          message: 'Voluptas sunt magni adipisci praesentium saepe.'
        }
      ],
      completed: true
    },
    {
      id: '98bf6e8b-becc-485b-9c3f-a7d09392c48d',
      name: 'Interview for the Asis. Sales Manager',
      description: 'We are looking for vue experience and of course node js strong knowledge',
      assignee: [
        {
          id: '473d2720-341c-49bf-94ed-556999cf6ef7',
          avatar: 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_2.jpg',
          name: 'Deja Brady'
        },
        {
          id: 'b8395203-887c-46f5-a85f-339b2d75c98b',
          avatar: 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_3.jpg',
          name: 'Harrison Stein'
        },
        {
          id: '18e23ac9-c874-43e4-8163-2d37f15f3367',
          avatar: 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_4.jpg',
          name: 'Reece Chung'
        },
        {
          id: 'a3be5485-03bf-47a6-b553-a9cf9f070ed8',
          avatar: 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_5.jpg',
          name: 'Lainey Davidson'
        },
        {
          id: '048f6343-7a65-4873-a570-eb6ff4eb1ba3',
          avatar: 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_6.jpg',
          name: 'Cristopher Cardenas'
        }
      ],
      due: [
        1661262884506,
        1661349284506
      ],
      attachments: [
        'https://minimal-assets-api-dev.vercel.app/assets/images/feeds/feed_2.jpg'
      ],
      comments: [],
      completed: false
    },
    {
      id: '99fbc02c-de89-4be3-9515-f8bd12227d38',
      name: 'Change the height of the top bar because it looks too chunky',
      description: 'We nede to make it aggressive with pricing because it’s in their interest to acquire us',
      assignee: [],
      due: [
        null,
        null
      ],
      attachments: [],
      comments: [],
      completed: true
    },
    {
      id: 'ab9cebca-6cb4-4847-aa17-3b261b3dd0fb',
      name: 'Integrate Stripe API',
      description: 'We nede to make it aggresive with pricing because it’s in their interest to acquire us',
      assignee: [
        {
          id: 'b8395203-887c-46f5-a85f-339b2d75c98b',
          avatar: 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_3.jpg',
          name: 'Melanie Noble'
        },
        {
          id: 'a3be5485-03bf-47a6-b553-a9cf9f070ed8',
          avatar: 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_6.jpg',
          name: 'Chase Day'
        }
      ],
      due: [
        null,
        null
      ],
      attachments: [
        'https://minimal-assets-api-dev.vercel.app/assets/images/feeds/feed_4.jpg'
      ],
      comments: [],
      completed: false
    },
    {
      id: 'ebf0d26a-78e5-414f-986f-003d8fcd3154',
      name: 'Update the customer API for payments',
      description: 'We need to make it aggresive with pricing because it’s in their interest to acquire us',
      assignee: [
        {
          id: '473d2720-341c-49bf-94ed-556999cf6ef7',
          avatar: 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_2.jpg',
          name: 'Shawn Manning'
        }
      ],
      due: [
        null,
        null
      ],
      attachments: [],
      comments: [],
      completed: true
    },
    {
      id: '9d98ce30-3c51-4de3-8537-7a4b663ee3af',
      name: 'Release minimals DS',
      description: 'Production',
      assignee: [
        {
          id: '473d2720-341c-49bf-94ed-556999cf6ef7',
          avatar: 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_2.jpg',
          name: 'Soren Durham'
        }
      ],
      due: [
        null,
        null
      ],
      attachments: [],
      comments: [],
      completed: true
    }
    ],
    columns: [
      {
        id: '8cd887ec-b3bc-11eb-8529-0242ac130003',
        name: 'Backlog',
        cardIds: [
          'deb02f04-9cf8-4f1e-97e0-2fbda84cc6b3',
          '98bf6e8b-becc-485b-9c3f-a7d09392c48d',
          '99fbc02c-de89-4be3-9515-f8bd12227d38'
        ]
      },
      {
        id: '23008a1f-ad94-4771-b85c-3566755afab7',
        name: 'Progress',
        cardIds: [
          'ab9cebca-6cb4-4847-aa17-3b261b3dd0fb',
          'ebf0d26a-78e5-414f-986f-003d8fcd3154'
        ]
      },
      {
        id: '37a9a747-f732-4587-a866-88d51c037641',
        name: 'Q&A',
        cardIds: []
      },
      {
        id: '4ac3cd37-b3e1-466a-8e3b-d7d88f6f5d4f',
        name: 'Production',
        cardIds: [
          '9d98ce30-3c51-4de3-8537-7a4b663ee3af'
        ]
      }
    ],
    columnOrder: [
      '8cd887ec-b3bc-11eb-8529-0242ac130003',
      '23008a1f-ad94-4771-b85c-3566755afab7',
      '37a9a747-f732-4587-a866-88d51c037641',
      '4ac3cd37-b3e1-466a-8e3b-d7d88f6f5d4f'
    ]
  }

  return () => {
    dispatch(slice.actions.startLoading());
    dispatch(slice.actions.getBoardSuccess(kanbanBoard));
  };
}

// ----------------------------------------------------------------------

export function createColumn(newColumn: { name: string }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/kanban/columns/new', newColumn);
      dispatch(slice.actions.createColumnSuccess(response.data.column));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateColumn(columnId: string, updateColumn: KanbanColumn) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/kanban/columns/update', {
        columnId,
        updateColumn,
      });
      dispatch(slice.actions.updateColumnSuccess(response.data.column));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteColumn(columnId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/kanban/columns/delete', { columnId });
      dispatch(slice.actions.deleteColumnSuccess({ columnId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function persistColumn(newColumnOrder: string[]) {
  return () => {
    dispatch(slice.actions.persistColumn(newColumnOrder));
  };
}

// ----------------------------------------------------------------------

export function persistCard(columns: Record<string, KanbanColumn>) {
  return () => {
    dispatch(slice.actions.persistCard(columns));
  };
}

// ----------------------------------------------------------------------

export function addTask({ card, columnId }: { card: Partial<KanbanCard>; columnId: string }) {
  return () => {
    dispatch(slice.actions.addTask({ card, columnId }));
  };
}

// ----------------------------------------------------------------------

export function deleteTask({ cardId, columnId }: { cardId: string; columnId: string }) {
  return () => {
    dispatch(slice.actions.deleteTask({ cardId, columnId }));
  };
}
