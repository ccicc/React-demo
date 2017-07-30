import {assert} from 'chai';

import * as types from 'app/actions/actionTypes';

import * as timerActions from 'app/actions/TimerAction';
import * as counterActions from 'app/actions/CounterAction';
import * as todoActions from 'app/actions/TodoAction';

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

    describe('todo action',() => {
        it('onTodoAdd',() => {
            const expectedAction = {type: types.TODO_ADD,content: 'test'};
            assert.deepEqual(todoActions.onTodoAdd('test'),expectedAction);
        });

        it('onTodoCompleted',() => {
            const expectedAction = {type: types.TODO_COMPLETED,id: 0};
            assert.deepEqual(todoActions.onTodoCompleted(0),expectedAction);
        });

        it('onTodoDelete',() => {
            const expectedAction = {type: types.TODO_DELETE,id: 0};
            assert.deepEqual(todoActions.onTodoDelete(0),expectedAction);
        });

        it('onTodoEditor',() => {
            const expectedAction = {type: types.TODO_EDITOR,id: 0,content: 'test'};
            assert.deepEqual(todoActions.onTodoEditor(0,'test'),expectedAction);
        });

        it('onTodoShowAll',() => {
            const expectedAction = {type: types.TODO_SHOW_ALL};
            assert.deepEqual(todoActions.onTodoShowAll(),expectedAction);
        });

        it('onTodoShowCompleted',() => {
            const expectedAction = {type: types.TODO_SHOW_COMPLETED};
            assert.deepEqual(todoActions.onTodoShowCompleted(),expectedAction);
        });

        it('onTodoShowActive',() => {
            const expectedAction = {type: types.TODO_SHOW_ACTIVE};
            assert.deepEqual(todoActions.onTodoShowActive(),expectedAction);
        });
    });
});
