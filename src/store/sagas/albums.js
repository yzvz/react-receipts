import { put } from 'redux-saga/effects';
import * as actionTypes from "../actionTypes";
import axios from '../../axios';

export function* albumsSaga(action) {
  yield put({ type: actionTypes.GET_ALBUMS_LOADING });
  const url = yield action.userId ? "/albums?userId=" + action.userId : "/albums";

  try {
    const response = yield axios.get(url);
    yield put({ type: actionTypes.GET_ALBUMS_SUCCESS, albums: response.data });
  } catch (error) {
    yield put({ type: actionTypes.GET_ALBUMS_ERROR, error });
  }
}

export function* albumSaga(action) {
  yield put({ type: actionTypes.GET_ALBUM_LOADING });

  try {
    const response = yield axios.get('/albums/' + action.albumId);
    yield put({ type: actionTypes.GET_ALBUM_SUCCESS, album: response.data });
    yield put({ type: actionTypes.GET_ALBUM_PHOTOS_INIT, albumId: action.albumId });
  } catch (error) {
    yield put({ type: actionTypes.GET_ALBUM_ERROR, error });
  }
}
