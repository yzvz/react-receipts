import * as aT from '../actionTypes';

export const getUsers = () => {
  return {
    type: aT.GET_USERS_INIT
  }
};

export const getUser = (userId) => {
  return {
    type: aT.GET_USER_INIT, userId
  }
};
