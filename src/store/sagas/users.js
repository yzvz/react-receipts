import { put } from 'redux-saga/effects';
import * as aT from '../actionTypes';
import axios from '../../axios';

export function* usersSaga() {
  yield put({ type: aT.GET_USERS_LOADING });

  try {
    const response = yield axios.get('/users');
    yield put({ type: aT.GET_USERS_SUCCESS, users: response.data });
  } catch (error) {
    yield put({ type: aT.GET_USERS_ERROR, error });
  }
}

export function* userSaga(action) {
  yield put({ type: aT.GET_USER_LOADING });

  try {
    const response = yield axios.get('/users/' + action.userId);
    yield put({ type: aT.GET_USER_SUCCESS, user: response.data });
  } catch (error) {
    yield put({ type: aT.GET_USER_ERROR, error });
  }
}
