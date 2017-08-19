import {
    assert
} from 'chai';

import * as types from 'app/actions/actionTypes';
import timer from 'app/reducers/timer';

describe('timer---reducer', () => {
    it('return initial state', () => {
        assert.deepEqual(
            timer(undefined, {}), {
                seconds: 0,
                status: 'stopped'
            }
        );
    });
    it('START', () => {
        const state = timer({}, {
            type: types.START
        });
        assert.strictEqual(state.status, 'staring');
    });
    it('STOP', () => {
        const state = timer({}, {
            type: types.STOP
        });
        assert.strictEqual(state.status, 'stopped');
    });
    it('RESET', () => {
        const state = timer({}, {
            type: types.RESET
        });
        assert.strictEqual(state.status, 'reset');
        assert.strictEqual(state.seconds, 0);
    });
    it('TIMER', () => {
        const state = timer({
            seconds: 0
        }, {
            type: types.TIMER
        });
        assert.strictEqual(state.seconds, 1);
    });
});
