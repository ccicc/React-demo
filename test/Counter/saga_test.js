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

import * as types from 'app/actions/actionTypes';
import * as counterActions from 'app/actions/CounterAction';
import {counterAsync,watchCounter} from 'app/saga/counter';

describe('counter---saga',() => {
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
