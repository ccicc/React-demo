// @flow

type State = {
    +seconds: number,
    +status: 'staring' | 'stopped' | 'reset'
};

type Action =
    | { type: 'START' }
    | { type: 'STOP' }
    | { type: 'RESET' }
    | { type: 'TIMER' };

const initState = {
    seconds: 0,
    status: 'stopped',
};

export default function timer(state: State = initState, action: Action): State {
    switch (action.type) {
        case 'START':
            return { ...state, ...{ status: 'staring' } };
        case 'STOP':
            return { ...state, ...{ status: 'stopped' } };
        case 'RESET':
            return { ...state, ...{ seconds: 0, status: 'reset' } };
        case 'TIMER':
            return { ...state, ...{ seconds: state.seconds + 1 } };
        default:
            return state;
    }
}
