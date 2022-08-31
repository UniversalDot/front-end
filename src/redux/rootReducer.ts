import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import accountReducer from './slices/accountSlice';
import profileReducer from './slices/profileSlice';
import tasksReducer from './slices/tasksSlice';
import daoReducer from './slices/daoSlice';
import loadersReducer from './slices/loadersSlice';
import calendarReducer from './slices/calendarSlice';
import kanbanReducer from './slices/kanbanSlice';
// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
  // NOTE: added by me;
  timeout: 2000,
};

const rootReducer = combineReducers({
  account: accountReducer,
  profile: profileReducer,
  tasks: tasksReducer,
  dao: daoReducer,
  loaders: loadersReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer
});

export { rootPersistConfig, rootReducer };
