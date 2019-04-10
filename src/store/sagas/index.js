import { takeEvery } from 'redux-saga/effects';
import { usersSaga, userSaga } from './users';
import { albumsSaga, albumSaga } from './albums';
import { photosSaga, photoSaga } from './photos';
import * as aT from '../actionTypes';

export function* watchUsers() {
  yield takeEvery(aT.GET_USERS_INIT, usersSaga);
  yield takeEvery(aT.GET_USER_INIT, userSaga);
}

export function* watchAlbums() {
  yield takeEvery(aT.GET_ALBUMS_INIT, albumsSaga);
  yield takeEvery(aT.GET_ALBUM_INIT, albumSaga);
  yield takeEvery(aT.GET_ALBUM_PHOTOS_INIT, photosSaga);
}

export function* watchPhotos() {
  yield takeEvery(aT.GET_PHOTOS_INIT, photosSaga);
  yield takeEvery(aT.GET_PHOTO_INIT, photoSaga);
}
