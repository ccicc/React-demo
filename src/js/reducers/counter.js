import {
    COUNTER_INCREMENT,
    COUNTER_DECREMENT,
    COUNTER_ASYNC
} from './../actions/actionTypes';

const initState = {
    sum: 0
};

function counter(state=initState, action) {
    switch(action.type) {
    case COUNTER_INCREMENT:
        return { sum: state.sum + 1 };
    case COUNTER_DECREMENT:
        return { sum: state.sum - 1 };
    default: 
        return state;
    }
}

export default counter;
