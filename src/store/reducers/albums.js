import {
  GET_ALBUMS_LOADING,
  GET_ALBUMS_SUCCESS,
  GET_ALBUMS_ERROR
} from '../actions/albums';

const initialState = {
  albums: [],
  albumsLoading: false,
  albumsError: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALBUMS_LOADING:
      return { ...state, albumsLoading: true }
    case GET_ALBUMS_SUCCESS:
      return { ...state, albums: action.albums, albumsLoading: false };
    case GET_ALBUMS_ERROR:
      return { ...state, albumsError: action.error, albumsLoading: false };
    default:
      break;
  }

  return state;
}

export default reducer;
