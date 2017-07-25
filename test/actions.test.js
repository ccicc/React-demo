import {assert} from 'chai';
import * as types from './../src/js/actions/actionTypes';
import * as actions from './../src/js/actions/TimerAction';

describe('测试 actions',() => {

    describe('timer action',() => {
        it('onStart',() => {
            const expectedAction = {type: types.START};
            assert.deepEqual(actions.onStart(),expectedAction);
        });

        it('onStop',() => {
            const expectedAction = {type: types.STOP};
            assert.deepEqual(actions.onStop(),expectedAction);
        });

        it('onReset',() => {
            const expectedAction = {type: types.RESET};
            assert.deepEqual(actions.onReset(),expectedAction);
        });

        it('onTimer',() => {
            const expectedAction = {type: types.TIMER};
            assert.deepEqual(actions.onTimer(),expectedAction);
        });
    });

});