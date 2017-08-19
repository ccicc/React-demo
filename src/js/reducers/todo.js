// @flow

import { combineReducers } from 'redux';

type ItemsState = Array<{
    +content: string,
    +completed: boolean,
    +id: number
}>;

type ItemsAction =
    | { type: 'TODO_ADD', content: string }
    | { type: 'TODO_COMPLETED', id: number }
    | { type: 'TODO_DELETE', id: number }
    | { type: 'TODO_EDITOR', id: number, content: string};

const initState = [
    {
        content: 'hello,world',
        completed: false,
        id: 0,
    }
];

function todoItems(state: ItemsState = initState, action: ItemsAction): ItemsState {
    switch (action.type) {
        case 'TODO_ADD': {
            return [
                ...state,
                {
                    content: action.content,
                    completed: false,
                    id: state.reduce((maxId, item) => Math.max(maxId, item.id), -1) + 1,
                },
            ];
        }
        case 'TODO_COMPLETED': {
            const id = action.id;
            return state.map(
                item => item.id === id
                    ?
                    { ...item, completed: !item.completed }
                    :
                    item
            );
        }
        case 'TODO_DELETE': {
            const id = action.id;
            return state.filter(item => item.id !== id);
        }
        case 'TODO_EDITOR': {
            const id = action.id;
            const content = action.content;
            return state.map(
                item => item.id === id && item.content !== content
                    ?
                    { ...item, content }
                    :
                    item
            );
        }
        default:
            return state;
    }
}

type ShowState =
    | 'SHOW_ALL'
    | 'SHOW_COMPLETED'
    | 'SHOW_ACTIVE';

type ShowActive =
    | { type: 'TODO_SHOW_ALL' }
    | { type: 'TODO_SHOW_COMPLETED' }
    | { type: 'TODO_SHOW_ACTIVE' };

function todoShow(state: ShowState = 'SHOW_ALL', action: ShowActive): ShowState {
    switch (action.type) {
        case 'TODO_SHOW_ALL':
            return state = 'SHOW_ALL';
        case 'TODO_SHOW_COMPLETED':
            return state = 'SHOW_COMPLETED';
        case 'TODO_SHOW_ACTIVE':
            return state = 'SHOW_ACTIVE';
        default:
            return state;
    }
}

const todo = combineReducers({
    todoItems,
    todoShow,
});

export default todo;
