import {assert} from 'chai';

import {timer,watchTimer} from './../src/js/saga/timer';
import * as actions from './../src/js/actions/TimerAction';
import * as types from './../src/js/actions/actionTypes';

import {createMockTask} from 'redux-saga/utils';
import {delay} from 'redux-saga';
import {
    fork,
    take,
    call,
    put,
    cancel
} from 'redux-saga/effects';

describe('测试 sagas',() => {

    describe('timer sagas',() => {
        
        it('timer-saga',() => {
            const gen = timer();
            assert.deepEqual(gen.next().value,call(delay,1000));
            assert.deepEqual(gen.next().value,put(actions.onTimer()));
        });

        it('watchTimer-saga',() => {
            const gen = watchTimer();

            let next = gen.next();
            assert.deepEqual(next.value,take(types.START));

            next = gen.next(actions.onStart());
            assert.deepEqual(next.value,fork(timer));

            let mockTask = createMockTask();
            mockTask.isRunning(true);
            next = gen.next(mockTask);
            assert.deepEqual(next.value,take([types.STOP,types.RESET]));

            next = gen.next();
            assert.deepEqual(next.value,cancel(mockTask));
        });
    });
});
