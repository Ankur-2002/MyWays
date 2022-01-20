import { createStore, combineReducers } from 'redux';
import reducer from './Reducer';
const store = createStore(reducer);
export default store;
