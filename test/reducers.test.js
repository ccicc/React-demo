import {assert} from 'chai';
import * as types from './../src/js/actions/actionTypes';

import timer from './../src/js/reducers/timer';
import counter from './../src/js/reducers/counter';
import counterAsync from './../src/js/reducers/counterAsync';

describe('test reducers',() => {

    describe('timer reducer',() => {
        it('type-START',() => {
            const state = timer({},{type: types.START});
            assert.strictEqual(state.status,'staring');
        });
        it('type-STOP',() => {
            const state = timer({},{type: types.STOP});
            assert.strictEqual(state.status,'stopped');
        });
        it('test-RESET',() => {
            const state = timer({},{type: types.RESET});
            assert.strictEqual(state.status,'reset');
            assert.strictEqual(state.seconds,0);
        });
        it('type-TIMER',() => {
            const state = timer({seconds: 0},{type: types.TIMER});
            assert.strictEqual(state.seconds,1);
        });
    });

    describe('counter reducer',() => {
        it('COUNTER_INCREMENT',() => {
            const state = counter({sum: 0},{type: types.COUNTER_INCREMENT});
            assert.strictEqual(state.sum,1);
        });
        it('COUNTER_DECREMENT',() => {
            const state = counter({sum: 0},{type: types.COUNTER_DECREMENT});
            assert.strictEqual(state.sum,-1);
        });

        it('COUNTER_ASYNC',() => {
            const state = counterAsync({},{type: types.COUNTER_ASYNC});
            assert.strictEqual(state.asyncBool,true);
        });
        it('COUNTER_TIMEOUT_DOWN',() => {
            const state = counterAsync({timeout: 3},{type: types.COUNTER_TIMEOUT_DOWN});
            assert.strictEqual(state.asyncBool,true);
            assert.strictEqual(state.timeout,2);
        });
        it('COUNTER_TIMEOUT_OVER',() => {
            const state = counterAsync({},{type: types.COUNTER_TIMEOUT_OVER});
            assert.strictEqual(state.asyncBool,false);
            assert.strictEqual(state.timeout,3);
        });
    });
});