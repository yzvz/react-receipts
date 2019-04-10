import * as aT from '../actionTypes';

export const getAlbums = (userId) => {
  return {
    type: aT.GET_ALBUMS_INIT, userId
  }
};
