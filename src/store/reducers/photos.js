import * as actionTypes from '../actionTypes';

const initialState = {
  photos: [],
  photosLoading: false,
  photosError: null,
  photo: null,
  photoLoading: false,
  photoError: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PHOTOS_LOADING:
      return { ...state, photosLoading: true }
    case actionTypes.GET_PHOTOS_SUCCESS:
      return { ...state, photos: action.photos, photosLoading: false };
    case actionTypes.GET_PHOTOS_ERROR:
      return { ...state, photosError: action.error, photosLoading: false };
    case actionTypes.GET_PHOTO_LOADING:
      return { ...state, photoError: null, photoLoading: true }
    case actionTypes.GET_PHOTO_SUCCESS:
      return { ...state, photo: action.photo, photoLoading: false }
    case actionTypes.GET_PHOTO_ERROR:
      return { ...state, photoError: action.error, photoLoading: false };
    default:
      break;
  }

  return state;
}

export default reducer;
