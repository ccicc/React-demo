import {
    assert
} from 'chai';

import * as types from 'app/actions/actionTypes';
import counter from 'app/reducers/counter';
import counterAsync from 'app/reducers/counterAsync';

describe('counter---reducer', () => {
    it('return counter initial state', () => {
        assert.deepEqual(
            counter(undefined, {}),
            {sum: 0}
        );
    });
    it('return counterAsync initial state', () => {
        assert.deepEqual(
            counterAsync(undefined, {}), 
            {asyncBool: false, timeout: 3}
        );
    });
    it('COUNTER_INCREMENT', () => {
        const state = counter({sum: 0}, {type: types.COUNTER_INCREMENT});
        assert.strictEqual(state.sum, 1);
    });
    it('COUNTER_DECREMENT', () => {
        const state = counter({sum: 0}, {type: types.COUNTER_DECREMENT});
        assert.strictEqual(state.sum, -1);
    });
    it('COUNTER_ASYNC', () => {
        const state = counterAsync({}, {type: types.COUNTER_ASYNC});
        assert.strictEqual(state.asyncBool, true);
    });
    it('COUNTER_TIMEOUT_DOWN', () => {
        const state = counterAsync({timeout: 3}, {type: types.COUNTER_TIMEOUT_DOWN});
        assert.strictEqual(state.asyncBool, true);
        assert.strictEqual(state.timeout, 2);
    });
    it('COUNTER_TIMEOUT_OVER', () => {
        const state = counterAsync({}, {type: types.COUNTER_TIMEOUT_OVER});
        assert.strictEqual(state.asyncBool, false);
        assert.strictEqual(state.timeout, 3);
    });
});
