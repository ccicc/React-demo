import {
    assert
} from 'chai';

import * as types from 'app/actions/actionTypes';
import * as todoActions from 'app/actions/TodoAction';

describe('todo---action', () => {
    it('onTodoAdd', () => {
        const expectedAction = {
            type: types.TODO_ADD,
            content: 'test'
        };
        assert.deepEqual(todoActions.onTodoAdd('test'), expectedAction);
    });

    it('onTodoCompleted', () => {
        const expectedAction = {
            type: types.TODO_COMPLETED,
            id: 0
        };
        assert.deepEqual(todoActions.onTodoCompleted(0), expectedAction);
    });

    it('onTodoDelete', () => {
        const expectedAction = {
            type: types.TODO_DELETE,
            id: 0
        };
        assert.deepEqual(todoActions.onTodoDelete(0), expectedAction);
    });

    it('onTodoEditor', () => {
        const expectedAction = {
            type: types.TODO_EDITOR,
            id: 0,
            content: 'test'
        };
        assert.deepEqual(todoActions.onTodoEditor(0, 'test'), expectedAction);
    });

    it('onTodoShowAll', () => {
        const expectedAction = {
            type: types.TODO_SHOW_ALL
        };
        assert.deepEqual(todoActions.onTodoShowAll(), expectedAction);
    });

    it('onTodoShowCompleted', () => {
        const expectedAction = {
            type: types.TODO_SHOW_COMPLETED
        };
        assert.deepEqual(todoActions.onTodoShowCompleted(), expectedAction);
    });

    it('onTodoShowActive', () => {
        const expectedAction = {
            type: types.TODO_SHOW_ACTIVE
        };
        assert.deepEqual(todoActions.onTodoShowActive(), expectedAction);
    });
});
