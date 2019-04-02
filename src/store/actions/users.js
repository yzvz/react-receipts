import axios from '../../axios';

export const GET_USERS = 'GET_USERS';
export const GET_USERS_LOADING = 'GET_USERS_LOADING';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_ERROR = 'GET_USERS_ERROR';

export const GET_USER = 'GET_USER';
export const GET_USER_LOADING = 'GET_USER_LOADING';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const CREATE_USER = 'CREATE_USER';

export const getUsers = () => {
  return dispatch => {
    dispatch({ type: GET_USERS_LOADING });

    axios.get('/users')
      .then((response) => {
        dispatch({ type: GET_USERS_SUCCESS, users: response.data })
      })
      .catch((error) => {
        dispatch({ type: GET_USERS_ERROR, error })
      });
  }
};

export const getUser = (userId) => {
  return dispatch => {
    dispatch({ type: GET_USER_LOADING });

    axios.get('/users/' + userId)
      .then(response =>
        dispatch({ type: GET_USER_SUCCESS, user: response.data })
      )
      .catch((error) => {
        dispatch({ type: GET_USER_ERROR, error })
      })
  }
};
