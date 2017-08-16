// @flow

import {
    TODO_ADD,
    TODO_COMPLETED,
    TODO_DELETE,
    TODO_EDITOR,
    TODO_SHOW_ALL,
    TODO_SHOW_COMPLETED,
    TODO_SHOW_ACTIVE,
} from './actionTypes';

export const onTodoAdd = (text: string) => ({
    type: TODO_ADD,
    content: text,
});

export const onTodoCompleted = (id: number) => ({
    id,
    type: TODO_COMPLETED,
});

export const onTodoDelete = (id: number) => ({
    id,
    type: TODO_DELETE,
});

export const onTodoEditor = (id: number, text: string) => ({
    id,
    type: TODO_EDITOR,
    content: text,
});

export const onTodoShowAll = () => ({ type: TODO_SHOW_ALL });
export const onTodoShowCompleted = () => ({ type: TODO_SHOW_COMPLETED });
export const onTodoShowActive = () => ({ type: TODO_SHOW_ACTIVE });
