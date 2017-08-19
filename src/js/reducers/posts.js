// @flow

import type { Posts, Error } from './../actions/postsAction';

type State = {
    +isFetching: boolean,
    +items: Array<Posts>,
    +lastUpdate?: string,
    +error?: Error
};

type Action =
    | { type: 'REUQEST_POSTS' }
    | { type: 'RECEIVE_POSTS', posts: Array<Posts>, receiveAt: string }
    | { type: 'REQUEST_POSTS_FAILED', error: Error };

const initState = {
    isFetching: false,
    items: [],
};

const posts = (state: State = initState, action: Action): State => {
    switch (action.type) {
        case 'REQUEST_POSTS':
            return {
                ...state,
                isFetching: true,
            };
        case 'RECEIVE_POSTS':
            return {
                ...state,
                isFetching: false,
                items: action.posts,
                lastUpdate: action.receiveAt,
            };
        case 'REQUEST_POSTS_FAILED':
            return {
                ...state,
                isFetching: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default posts;
