import {combineReducers} from 'redux';

import timer from './timer';
import counter from './counter';
import counterAsync from './counterAsync';

const rootReducer = combineReducers({
    timer,
    counter,
    counterAsync
});

export default rootReducer;