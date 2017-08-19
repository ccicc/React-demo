import {
    delay,
} from 'redux-saga';

import {
    call,
    take,
    put,
    fork,
    cancel,
    cancelled,
} from 'redux-saga/effects';

import { START, STOP, RESET } from './../actions/actionTypes';
import { onTimer } from './../actions/TimerAction';

export function* timer() {
    try {
        while (true) {
            yield call(delay, 1000);
            yield put(onTimer());
        }
    } finally {
        if (yield cancelled()) {
            console.log('取消timer');
        }
    }
}

export function* watchTimer() {
    while (yield take(START)) {
        const bgTimer = yield fork(timer);
        yield take([STOP, RESET]);
        yield cancel(bgTimer);
    }
}
