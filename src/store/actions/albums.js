import * as actionTypes from "../actionTypes";

export const getAlbums = userId => {
  return {
    type: actionTypes.GET_ALBUMS_INIT,
    userId
  };
};

export const getAlbum = albumId => {
  return {
    type: actionTypes.GET_ALBUM_INIT,
    albumId
  };
};
