import {
    assert
} from 'chai';

import * as types from 'app/actions/actionTypes';
import * as counterActions from 'app/actions/CounterAction';

describe('counter---action', () => {
    it('onIncrement', () => {
        const expectedAction = {
            type: types.COUNTER_INCREMENT
        };
        assert.deepEqual(counterActions.onIncrement(), expectedAction);
    });
    it('onDecrement', () => {
        const expectedAction = {
            type: types.COUNTER_DECREMENT
        };
        assert.deepEqual(counterActions.onDecrement(), expectedAction);
    });
    it('onAsyncIncrement', () => {
        const expectedAction = {
            type: types.COUNTER_ASYNC
        };
        assert.deepEqual(counterActions.onAsyncIncrement(), expectedAction);
    });
    it('onTimeoutDown', () => {
        const expectedAction = {
            type: types.COUNTER_TIMEOUT_DOWN
        };
        assert.deepEqual(counterActions.onTimeoutDown(), expectedAction);
    });
    it('onTimeoutOver', () => {
        const expectedAction = {
            type: types.COUNTER_TIMEOUT_OVER
        };
        assert.deepEqual(counterActions.onTimeoutOver(), expectedAction);
    });
});
