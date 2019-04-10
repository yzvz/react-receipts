import { put } from 'redux-saga/effects';
import * as aT from '../actionTypes';
import axios from '../../axios';

export function* photosSaga(action) {
  yield put({ type: aT.GET_PHOTOS_LOADING });
  const url = yield action.albumId ? "/photos?albumId=" + action.albumId : "/photos";

  try {
    const response = yield axios.get(url);
    yield put({ type: aT.GET_PHOTOS_SUCCESS, photos: response.data });
  } catch (error) {
    yield put({ type: aT.GET_PHOTOS_ERROR, error });
  }
}

export function* photoSaga(action) {
  yield put({ type: aT.GET_PHOTO_LOADING });

  try {
    const response = yield axios.get('/photos/' + action.photoId);
    yield put({ type: aT.GET_PHOTO_SUCCESS, photo: response.data });
  } catch (error) {
    yield put({ type: aT.GET_PHOTO_ERROR, error });
  }
}
