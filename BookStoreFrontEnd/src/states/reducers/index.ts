import { combineReducers } from 'redux';
import authReducer from './authReducer';
import bookReducer from './bookReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  books: bookReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
