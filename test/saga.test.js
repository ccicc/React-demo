import {assert} from 'chai';
import {createMockTask} from 'redux-saga/utils';
import {delay} from 'redux-saga';
import {
    fork,
    take,
    call,
    put,
    cancel
} from 'redux-saga/effects';
import * as types from './../src/js/actions/actionTypes';

import * as timerActions from './../src/js/actions/TimerAction';
import * as counterActions from './../src/js/actions/CounterAction';

import {timer,watchTimer} from './../src/js/saga/timer';
import {counterAsync,watchCounter} from './../src/js/saga/counter';

describe('test sagas',() => {

    describe('timer sagas',() => {
        
        it('timer-saga',() => {
            const gen = timer();
            assert.deepEqual(gen.next().value,call(delay,1000));
            assert.deepEqual(gen.next().value,put(timerActions.onTimer()));
            assert.deepEqual(gen.next().value,call(delay,1000));
        });

        it('watchTimer-saga',() => {
            const gen = watchTimer();

            let next = gen.next();
            assert.deepEqual(next.value,take(types.START));

            next = gen.next(timerActions.onStart());
            assert.deepEqual(next.value,fork(timer));

            let mockTask = createMockTask();
            mockTask.isRunning(true);
            next = gen.next(mockTask);
            assert.deepEqual(next.value,take([types.STOP,types.RESET]));

            next = gen.next();
            assert.deepEqual(next.value,cancel(mockTask));
            
            next = gen.next();
            assert.deepEqual(next.value,take(types.START));
        });
    });

    describe('counter saga',() => {
        it('counterAsync-saga',() => {
            const gen = counterAsync();
            for(let i = 0;i < 3;i++){
                assert.deepEqual(gen.next().value,call(delay,1000));
                assert.deepEqual(gen.next().value,put(counterActions.onTimeoutDown()));
            }
            assert.deepEqual(gen.next().value,put(counterActions.onIncrement()));
            assert.deepEqual(gen.next().value,put(counterActions.onTimeoutOver()));
            assert.deepEqual(gen.next(),{value: undefined,done: true});
        });
    });
});
