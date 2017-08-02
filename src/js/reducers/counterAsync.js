import {
    COUNTER_ASYNC,
    COUNTER_TIMEOUT_DOWN,
    COUNTER_TIMEOUT_OVER
} from './../actions/actionTypes';

const initState = {
    asyncBool: false,
    timeout: 3
};

function counterAsync(state = initState, action) {
    switch(action.type) {
        case COUNTER_ASYNC:
            return { ...state, asyncBool: true };
        case COUNTER_TIMEOUT_DOWN:
            return {
                ...state,
                asyncBool: true,
                timeout: state.timeout - 1
            };
        case COUNTER_TIMEOUT_OVER:
            return {
                ...state,
                asyncBool: false,
                timeout: 3
            };
        default: 
            return state;
    }
}

export default counterAsync;
