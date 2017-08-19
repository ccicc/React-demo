import { combineReducers } from 'redux';

import timer from './timer';
import counter from './counter';
import counterAsync from './counterAsync';
import todo from './todo';
import posts from './posts';

const rootReducer = combineReducers({
    timer,
    counter,
    counterAsync,
    todo,
    posts,
});

export default rootReducer;
