import * as aT from '../actionTypes';

export const getPhotos = (albumId) => {
  return {
    type: aT.GET_PHOTOS_INIT, albumId
  }
};

export const getPhoto = (photoId) => {
  return {
    type: aT.GET_PHOTO_INIT, photoId
  }
}
