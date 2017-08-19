import {
    assert
} from 'chai';

import * as types from 'app/actions/actionTypes';
import * as timerActions from 'app/actions/TimerAction';

describe('timer---action', () => {
    it('onStart', () => {
        const expectedAction = {
            type: types.START
        };
        assert.deepEqual(timerActions.onStart(), expectedAction);
    });
    it('onStop', () => {
        const expectedAction = {
            type: types.STOP
        };
        assert.deepEqual(timerActions.onStop(), expectedAction);
    });
    it('onReset', () => {
        const expectedAction = {
            type: types.RESET
        };
        assert.deepEqual(timerActions.onReset(), expectedAction);
    });
    it('onTimer', () => {
        const expectedAction = {
            type: types.TIMER
        };
        assert.deepEqual(timerActions.onTimer(), expectedAction);
    });
});
