// @flow

type AsyncAction = { type: 'COUNTER_ASYNC' };
type DownAction = { type: 'COUNTER_TIMEOUT_DOWN' };
type OverAction = { type: 'COUNTER_TIMEOUT_OVER' };

type Action =
    | AsyncAction
    | DownAction
    | OverAction;

type State = {
    +asyncBool: boolean,
    +timeout: number
}

const initState = {
    asyncBool: false,
    timeout: 3,
};

function counterAsync(state: State = initState, action: Action): State {
    switch (action.type) {
        case 'COUNTER_ASYNC':
            return { ...state, asyncBool: true };
        case 'COUNTER_TIMEOUT_DOWN':
            return {
                ...state,
                asyncBool: true,
                timeout: state.timeout - 1,
            };
        case 'COUNTER_TIMEOUT_OVER':
            return {
                ...state,
                asyncBool: false,
                timeout: 3,
            };
        default:
            return state;
    }
}

export default counterAsync;
