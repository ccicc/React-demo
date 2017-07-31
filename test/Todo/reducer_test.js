import {
    assert
} from 'chai';

import * as types from 'app/actions/actionTypes';
import todo from 'app/reducers/todo';

describe('todo---reducer', () => {
    const initTodoItem = {
        content: 'hello,world',
        completed: false,
        id: 0
    };
    const initState = {
        todoShow: 'SHOW_ALL',
        todoItems: [initTodoItem]
    };

    it('return initial state', () => {
        assert.deepEqual(
            todo(undefined, {}),
            initState
        );
    });
    it('TODO_ADD', () => {
        const state = todo({}, {
            type: types.TODO_ADD,
            content: 'test'
        });
        assert.deepEqual(
            state, 
            {
                todoShow: 'SHOW_ALL',
                todoItems: [initTodoItem, {
                    content: 'test',
                    completed: false,
                    id: 1
                }]
            }
        );
    });
    it('TODO_COMPLETED', () => {
        const state = todo({}, {
            type: types.TODO_COMPLETED,
            id: 0
        });
        assert.deepEqual(
            state, 
            {
                todoShow: 'SHOW_ALL',
                todoItems: [{ ...initTodoItem,
                    completed: true
                }]
            }
        );
    });
    it('TODO_DELETE', () => {
        const state = todo({}, {
            type: types.TODO_DELETE,
            id: 0
        });
        assert.deepEqual(
            state, 
            {
                todoShow: 'SHOW_ALL',
                todoItems: []
            }
        );
    });
    it('TODO_EDITOR', () => {
        const state = todo({}, {
            type: types.TODO_EDITOR,
            id: 0,
            content: 'test'
        });
        assert.deepEqual(
            state, 
            {
                todoShow: 'SHOW_ALL',
                todoItems: [{ ...initTodoItem,
                    content: 'test'
                }]
            }
        );
    });

    it('TODO_SHOW_ALL', () => {
        const state = todo({}, {
            type: types.TODO_SHOW_ALL
        });
        assert.deepEqual(
            state, 
            {
                todoShow: 'SHOW_ALL',
                todoItems: [initTodoItem]
            }
        );
    });
    it('TODO_SHOW_COMPLETED', () => {
        const state = todo({}, {
            type: types.TODO_SHOW_COMPLETED
        });
        assert.deepEqual(
            state, 
            {
                todoShow: 'SHOW_COMPLETED',
                todoItems: [initTodoItem]
            }
        );
    });
    it('TODO_SHOW_ACTIVE', () => {
        const state = todo({}, {
            type: types.TODO_SHOW_ACTIVE
        });
        assert.deepEqual(
            state, 
            {
                todoShow: 'SHOW_ACTIVE',
                todoItems: [initTodoItem]
            }
        );
    });
});
