import { takeEvery } from "redux-saga/effects";
import { usersSaga, userSaga } from "./users";
import { albumsSaga, albumSaga } from "./albums";
import { photosSaga, photoSaga } from "./photos";
import * as actionTypes from "../actionTypes";

export function* watchUsers() {
  yield takeEvery(actionTypes.GET_USERS_INIT, usersSaga);
  yield takeEvery(actionTypes.GET_USER_INIT, userSaga);
}

export function* watchAlbums() {
  yield takeEvery(actionTypes.GET_ALBUMS_INIT, albumsSaga);
  yield takeEvery(actionTypes.GET_ALBUM_INIT, albumSaga);
  yield takeEvery(actionTypes.GET_ALBUM_PHOTOS_INIT, photosSaga);
}

export function* watchPhotos() {
  yield takeEvery(actionTypes.GET_PHOTOS_INIT, photosSaga);
  yield takeEvery(actionTypes.GET_PHOTO_INIT, photoSaga);
}
