import * as actionTypes from '../actionTypes';

export const getPhotos = (albumId) => {
  return {
    type: actionTypes.GET_PHOTOS_INIT, albumId
  }
};

export const getPhoto = (photoId) => {
  return {
    type: actionTypes.GET_PHOTO_INIT, photoId
  }
}
