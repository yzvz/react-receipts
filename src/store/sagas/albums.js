import { put } from 'redux-saga/effects';
import * as aT from "../actionTypes";
import axios from '../../axios';

export function* albumsSaga(action) {
  yield put({ type: aT.GET_ALBUMS_LOADING });
  const url = yield action.userId ? "/albums?userId=" + action.userId : "/albums";

  try {
    const response = yield axios.get(url);
    yield put({ type: aT.GET_ALBUMS_SUCCESS, albums: response.data });
  } catch (error) {
    yield put({ type: aT.GET_ALBUMS_ERROR, error });
  }
}
