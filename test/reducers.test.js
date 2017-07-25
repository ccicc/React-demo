import {assert} from 'chai';
import timer from './../src/js/reducers/timer';
import * as types from './../src/js/actions/actionTypes';

describe('测试 reducers',() => {

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

});