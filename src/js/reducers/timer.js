import {
    START,
    STOP,
    RESET,
    TIMER
} from './../actions/actionTypes';

const initState = {
    seconds: 0,
    status: 'stopeed'
};

export default function timer(state=initState,action){
    switch(action.type){
        case START:
            return {...state,...{status: 'staring'}};
        case STOP:
            return {...state,...{status: 'stopped'}};
        case RESET:
            return {...state,...{seconds: 0,status: 'reset'}};
        case TIMER:  
            return {...state,...{seconds: state.seconds + 1}};
        default:
            return state;
    }
};