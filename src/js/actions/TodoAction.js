import {
    TODO_ADD,
    TODO_COMPLETED,
    TODO_DELETE,
    TODO_SHOW_ALL,
    TODO_SHOW_COMPLETED,
    TODO_SHOW_ACTIVE
} from './actionTypes';

export const onTodoAdd = (text) => ({
    type: TODO_ADD,
    content: text
});

export const onTodoCompleted = (id) => ({
    type: TODO_COMPLETED,
    id: id
});

export const onTodoDelete = (id) => ({
    type: TODO_DELETE,
    id: id
});

export const onTodoShowAll = () => ({type: TODO_SHOW_ALL});
export const onTodoShowCompleted = () => ({type: TODO_SHOW_COMPLETED});
export const onTodoShowActive = () => ({type: TODO_SHOW_ACTIVE});