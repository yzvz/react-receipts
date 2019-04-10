import * as actionTypes from '../actionTypes';

export const getUsers = () => {
  return {
    type: actionTypes.GET_USERS_INIT
  }
};

export const getUser = (userId) => {
  return {
    type: actionTypes.GET_USER_INIT, userId
  }
};
