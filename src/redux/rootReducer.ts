import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import accountReducer from './slices/accountSlice';
import profileReducer from './slices/profileSlice';
import statusReducer from './slices/statusSlice';
import tasksReducer from './slices/tasksSlice';
import daoReducer from './slices/daoSlice';
import loadersReducer from './slices/loadersSlice';
import generalReducer from './slices/generalSlice';
// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
  // NOTE: added by me
  timeout: 2000, //Set the timeout function to 2 seconds
};

const rootReducer = combineReducers({
  general: generalReducer,
  account: accountReducer,
  profile: profileReducer,
  status: statusReducer,
  tasks: tasksReducer,
  dao: daoReducer,
  loaders: loadersReducer,
});

export { rootPersistConfig, rootReducer };
