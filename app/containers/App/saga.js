import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import {INIT_APP} from "./constants";
import request from 'utils/request';

export default function* defaultSaga() {
  yield []
}
