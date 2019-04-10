import * as aT from '../actionTypes';

export const getAlbums = (userId) => {
  return {
    type: aT.GET_ALBUMS_INIT, userId
  }
};

export const getAlbum = (albumId) => {
  return {
    type: aT.GET_ALBUM_INIT, albumId
  }
}
