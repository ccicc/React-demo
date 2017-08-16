// @flow

import {
    REQUEST_POSTS,
    RECEIVE_POSTS,
    REQUEST_POSTS_FAILED,
} from './actionTypes';

export type Posts = {
    id: number,
    following: number,
    login: string,
    avatar_url: string,
    html_url: string
};

export type Error = {
    message: string
};

const onRequestPosts = () => ({
    type: REQUEST_POSTS
});

const onReceivePosts = (posts: Posts, receiveAt: string) => ({
    type: RECEIVE_POSTS,
    posts,
    receiveAt
});

const onRequestPostsFailed = (error: Error) => ({
    type: REQUEST_POSTS_FAILED,
    error
});

export {
    onRequestPosts,
    onReceivePosts,
    onRequestPostsFailed
};
