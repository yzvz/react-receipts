import * as aT from '../actionTypes';

const initialState = {
  users: [],
  usersLoading: false,
  usersError: null,
  user: null,
  userLoading: false,
  userError: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case aT.GET_USERS_LOADING:
      return { ...state, usersError: null, usersLoading: true }
    case aT.GET_USERS_SUCCESS:
      return { ...state, users: action.users, usersLoading: false };
    case aT.GET_USERS_ERROR:
      return { ...state, usersError: action.error, usersLoading: false };
    case aT.GET_USER_LOADING:
      return { ...state, userError: null, userLoading: true }
    case aT.GET_USER_SUCCESS:
      return { ...state, user: action.user, userLoading: false }
    case aT.GET_USER_ERROR:
      return { ...state, userError: action.error, userLoading: false };
    default:
      break;
  }

  return state;
}

export default reducer;
