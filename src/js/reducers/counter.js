// @flow

type State = {
    +sum: number
};

type Action =
    | { type: 'COUNTER_INCREMENT' }
    | { type: 'COUNTER_DECREMENT' };

const initState = {
    sum: 0,
};

function counter(state: State = initState, action: Action): State {
    switch (action.type) {
        case 'COUNTER_INCREMENT':
            return { sum: state.sum + 1 };
        case 'COUNTER_DECREMENT':
            return { sum: state.sum - 1 };
        default:
            return state;
    }
}

export default counter;
