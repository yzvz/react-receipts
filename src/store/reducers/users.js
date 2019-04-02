import {
  GET_USERS_LOADING,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  GET_USER_LOADING,
  GET_USER_SUCCESS,
  GET_USER_ERROR
} from '../actions/users';

const initialState = {
  users: [],
  usersLoading: false,
  usersError: null,
  userLoading: false,
  userError: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_LOADING:
      return { ...state, usersLoading: true }
    case GET_USERS_SUCCESS:
      return { ...state, users: action.users, usersLoading: false };
    case GET_USERS_ERROR:
      return { ...state, usersError: action.error, usersLoading: false };
    case GET_USER_LOADING:
    return { ...state, userLoading: true }
    case GET_USER_SUCCESS:
      return { ...state, user: action.user, userLoading: false }
    case GET_USER_ERROR:
      return { ...state, userError: action.error, userLoading: false };
    default:
      break;
  }

  return state;
}

export default reducer;
