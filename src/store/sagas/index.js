import { takeEvery } from 'redux-saga/effects';
import { usersSaga, userSaga } from './users';
import { albumsSaga } from './albums';
import * as aT from '../actionTypes';

export function* watchUsers() {
  yield takeEvery(aT.GET_USERS_INIT, usersSaga);
  yield takeEvery(aT.GET_USER_INIT, userSaga);
}

export function* watchAlbums() {
  yield takeEvery(aT.GET_ALBUMS_INIT, albumsSaga);
}
