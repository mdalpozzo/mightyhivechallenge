import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';

import userReducer from './userReducer';

const initialState = {};

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
