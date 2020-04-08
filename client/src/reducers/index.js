import { combineReducers } from 'redux';
import alert from './alert';
import search from './search';

export default combineReducers({
  alert,
  search,
});
