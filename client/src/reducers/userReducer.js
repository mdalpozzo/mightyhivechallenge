import { merge } from 'lodash';

import * as types from '../actions/actionTypes';

const initialState = {
  dbUpdated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_USER_DATA:
      return merge({}, state, {
        dbUpdated: true,
        userData: action.payload,
      });
    case types.GET_ALL_USER_DATA:
      return merge({}, state, {
        allUserData: action.payload,
      });
    default:
      return state;
  }
};

export default userReducer;
