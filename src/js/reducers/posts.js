import {
    REQUEST_POSTS,
    RECEIVE_POSTS,
    REQUEST_POSTS_FAILED,
} from './../actions/actionTypes';

const initState = {
    isFetching: false,
    items: [],
};
const posts = (state = initState, action) => {
    switch (action.type) {
        case REQUEST_POSTS:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                items: action.posts,
                lastUpdate: action.receiveAt,
            };
        case REQUEST_POSTS_FAILED:
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
