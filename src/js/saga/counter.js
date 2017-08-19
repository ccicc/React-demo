import { delay, takeEvery } from 'redux-saga';
import {
    put,
    call,
} from 'redux-saga/effects';

import {
    onIncrement,
    onTimeoutDown,
    onTimeoutOver,
} from './../actions/CounterAction';

import { COUNTER_ASYNC } from './../actions/actionTypes';

export function* counterAsync() {
    for (let i = 0; i < 3; i++) {
        yield call(delay, 1000);
        yield put(onTimeoutDown());
    }
    yield put(onIncrement());
    yield put(onTimeoutOver());
}

export function* watchCounter() {
    yield takeEvery(COUNTER_ASYNC, counterAsync);
}
