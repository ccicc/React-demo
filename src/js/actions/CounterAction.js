import {
    COUNTER_INCREMENT,
    COUNTER_DECREMENT,
    COUNTER_ASYNC,
    COUNTER_TIMEOUT_DOWN,
    COUNTER_TIMEOUT_OVER
} from './actionTypes';

export const onIncrement = () => ({type: COUNTER_INCREMENT});
export const onDecrement = () => ({type: COUNTER_DECREMENT});

export const onAsyncIncrement = () => ({type: COUNTER_ASYNC});
export const onTimeoutDown = () => ({type: COUNTER_TIMEOUT_DOWN});
export const onTimeoutOver = () => ({type: COUNTER_TIMEOUT_OVER});