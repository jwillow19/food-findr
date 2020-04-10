import { combineReducers } from 'redux';
import alert from './alert';
import search from './search';
import filter from './filter';

export default combineReducers({
  alert,
  search,
  filter,
});
