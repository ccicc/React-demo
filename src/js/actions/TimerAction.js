import {
    START,
    STOP,
    RESET,
    TIMER
} from './actionTypes';

export const onStart = () => ({ type: START });
export const onStop = () => ({ type: STOP });
export const onReset = () => ({ type: RESET });
export const onTimer = () => ({ type: TIMER });
