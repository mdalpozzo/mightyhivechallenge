import axios from 'axios';
import * as types from './actionTypes';

// DEVELOPMENT
const apiHost = 'http://localhost:8000/';

function url(endpoint) {
  return apiHost + endpoint;
}

export const dbUpdate = currentBallColor => dispatch => {
  axios
    .post('api/users/dbUpdate', {
      params: {
        currentBallColor,
      },
    })
    .then(user => {
      dispatch({
        type: types.UPDATE_USER_DATA,
        payload: user,
      });
    });
};

export const getAllUsers = () => dispatch => {
  axios.get('api/users/getAllUsers').then(users => {
    dispatch({
      type: types.GET_ALL_USER_DATA,
      payload: users,
    });
  });
};
