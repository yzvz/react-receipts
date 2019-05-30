import * as actionTypes from "../actionTypes";

const initialState = {
  albums: [],
  albumsLoading: false,
  albumsError: null,
  album: null,
  albumLoading: false,
  albumError: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALBUMS_LOADING:
      return { ...state, albumsLoading: true };
    case actionTypes.GET_ALBUMS_SUCCESS:
      return { ...state, albums: action.albums, albumsLoading: false };
    case actionTypes.GET_ALBUMS_ERROR:
      return { ...state, albumsError: action.error, albumsLoading: false };
    case actionTypes.GET_ALBUM_LOADING:
      return { ...state, albumError: null, albumLoading: true };
    case actionTypes.GET_ALBUM_SUCCESS:
      return { ...state, album: action.album, albumLoading: false };
    case actionTypes.GET_ALBUM_ERROR:
      return { ...state, albumError: action.error, albumLoading: false };
    default:
      break;
  }

  return state;
};

export default reducer;
