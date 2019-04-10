import * as aT from '../actionTypes';

const initialState = {
  albums: [],
  albumsLoading: false,
  albumsError: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case aT.GET_ALBUMS_LOADING:
      return { ...state, albumsLoading: true }
    case aT.GET_ALBUMS_SUCCESS:
      return { ...state, albums: action.albums, albumsLoading: false };
    case aT.GET_ALBUMS_ERROR:
      return { ...state, albumsError: action.error, albumsLoading: false };
    default:
      break;
  }

  return state;
}

export default reducer;
