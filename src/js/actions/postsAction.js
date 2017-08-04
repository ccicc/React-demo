import {
    REQUEST_POSTS,
    RECEIVE_POSTS,
    REQUEST_POSTS_FAILED,
} from './actionTypes';

export const onRequestPosts = () => ({
    type: REQUEST_POSTS
});

export const onReceivePosts = (posts, receiveAt) => ({
    type: RECEIVE_POSTS,
    posts,
    receiveAt,
});

export const onRequestPostsFailed = error => ({
    type: REQUEST_POSTS_FAILED,
    error
});
