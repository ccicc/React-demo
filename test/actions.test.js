import {assert} from 'chai';
import * as types from './../src/js/actions/actionTypes';
import * as timerActions from './../src/js/actions/TimerAction';
import * as counterActions from './../src/js/actions/CounterAction';

describe('test Aations',() => {

    describe('timer action',() => {
        it('onStart',() => {
            const expectedAction = {type: types.START};
            assert.deepEqual(timerActions.onStart(),expectedAction);
        });
        it('onStop',() => {
            const expectedAction = {type: types.STOP};
            assert.deepEqual(timerActions.onStop(),expectedAction);
        });
        it('onReset',() => {
            const expectedAction = {type: types.RESET};
            assert.deepEqual(timerActions.onReset(),expectedAction);
        });
        it('onTimer',() => {
            const expectedAction = {type: types.TIMER};
            assert.deepEqual(timerActions.onTimer(),expectedAction);
        });
    });

    describe('counter action',() => {
        it('onIncrement',() => {
            const expectedAction = {type: types.COUNTER_INCREMENT};
            assert.deepEqual(counterActions.onIncrement(),expectedAction);
        });
        it('onDecrement',() => {
            const expectedAction = {type: types.COUNTER_DECREMENT};
            assert.deepEqual(counterActions.onDecrement(),expectedAction);
        });
        it('onAsyncIncrement',() => {
            const expectedAction = {type: types.COUNTER_ASYNC};
            assert.deepEqual(counterActions.onAsyncIncrement(),expectedAction);
        });
        it('onTimeoutDown',() => {
            const expectedAction = {type: types.COUNTER_TIMEOUT_DOWN};
            assert.deepEqual(counterActions.onTimeoutDown(),expectedAction);
        });
        it('onTimeoutOver',() => {
            const expectedAction = {type: types.COUNTER_TIMEOUT_OVER};
            assert.deepEqual(counterActions.onTimeoutOver(),expectedAction);
        });
    });

});