import { assert } from 'chai';
import { createMockTask } from 'redux-saga/utils';
import { delay } from 'redux-saga';
import {
    put,
    call,
    fork,
    take,
    cancel
} from 'redux-saga/effects';

import * as types from 'app/actions/actionTypes';
import * as timerActions from 'app/actions/TimerAction';
import { timer, watchTimer } from 'app/saga/timer';

describe('timer---sagas', () => {
    it('timer-saga', () => {
        const gen = timer();
        assert.deepEqual(gen.next().value, call(delay, 1000));
        assert.deepEqual(gen.next().value, put(timerActions.onTimer()));
        assert.deepEqual(gen.next().value, call(delay, 1000));
    });
    it('watchTimer-saga', () => {
        const gen = watchTimer();

        let next = gen.next();
        assert.deepEqual(next.value, take(types.START));

        next = gen.next(timerActions.onStart());
        assert.deepEqual(next.value, fork(timer));

        let mockTask = createMockTask();
        mockTask.isRunning(true);
        next = gen.next(mockTask);
        assert.deepEqual(next.value, take([ types.STOP, types.RESET ]));

        next = gen.next();
        assert.deepEqual(next.value, cancel(mockTask));

        next = gen.next();
        assert.deepEqual(next.value, take(types.START));
    });
});
