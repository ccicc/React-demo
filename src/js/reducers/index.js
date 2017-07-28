import {combineReducers} from 'redux';

import timer from './timer';
import counter from './counter';
import counterAsync from './counterAsync';
import todo from './todo';

const rootReducer = combineReducers({
    timer,
    counter,
    counterAsync,
    todo
});

export default rootReducer;