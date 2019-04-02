import axios from '../../axios';

export const GET_ALBUMS = 'GET_ALBUMS';
export const GET_ALBUMS_LOADING = 'GET_ALBUMS_LOADING';
export const GET_ALBUMS_SUCCESS = 'GET_ALBUMS_SUCCESS';
export const GET_ALBUMS_ERROR = 'GET_ALBUMS_ERROR';

export const getAlbums = (userId) => {
  return dispatch => {
    dispatch({ type: GET_ALBUMS_LOADING });

    const url = userId
      ? '/albums?userId=' + userId
      : '/albums';

    axios.get(url)
      .then((response) => {
        dispatch({ type: GET_ALBUMS_SUCCESS, albums: response.data })
      })
      .catch((error) => {
        dispatch({ type: GET_ALBUMS_ERROR, error })
      });
  }
};
