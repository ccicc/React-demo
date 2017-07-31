import {combineReducers} from 'redux';

import {
    TODO_ADD,
    TODO_COMPLETED,
    TODO_DELETE,
    TODO_EDITOR,
    TODO_SHOW_ALL,
    TODO_SHOW_COMPLETED,
    TODO_SHOW_ACTIVE
} from './../actions/actionTypes';


const initState = [{
    content: 'hello,world',
    completed: false,
    id: 0
}];

function todoItems(state=initState,action){
    switch(action.type){
        case TODO_ADD:
            return [
                ...state,
                {
                    content: action.content,
                    completed: false,
                    id: state.reduce((maxId,item) => Math.max(maxId,item.id),-1) + 1
                }
            ];
        case TODO_COMPLETED:
            return state.map(item => 
                item.id === action.id 
                ? 
                {...item,completed: !item.completed} 
                :
                item
            );
        case TODO_DELETE:
            return state.filter(item => item.id !== action.id);
        case TODO_EDITOR:
            return state.map(item => 
                item.id === action.id && item.content !== action.content
                ?
                {...item,content: action.content}
                :
                item
            );
        default:
            return state;
    }
}

function todoShow(state='SHOW_ALL',action){
    switch(action.type){
        case TODO_SHOW_ALL:
            return state = "SHOW_ALL";
        case TODO_SHOW_COMPLETED:
            return state = "SHOW_COMPLETED";
        case TODO_SHOW_ACTIVE:
            return state = "SHOW_ACTIVE";
        default:
            return state;
    }
}

const todo = combineReducers({
    todoItems,
    todoShow
});

export default todo;
