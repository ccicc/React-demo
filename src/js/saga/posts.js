import fetch from 'isomorphic-fetch';
import moment from 'moment';

import {
    take,
    put,
    call,
    fork,
} from 'redux-saga/effects';

import { onReceivePosts, onRequestPostsFailed } from './../actions/postsAction';
import { REQUEST_POSTS } from './../actions/actionTypes';

export function fetchPostsApi() {
    return fetch('https://api.github.com/users')
        .then(response => response.json())
        .then(json => json.map(item => item.url))
        .then(urls => urls.map(url => fetch(url).then(response => response.json())))
        .then(users => Promise.all(users));
}

export function* fetchPosts() {
    try {
        const posts = yield call(fetchPostsApi);
        const receiveAt = moment().format('HH:mm:ss');
        yield put(onReceivePosts(posts, receiveAt));
    } catch (error) {
        yield put(onRequestPostsFailed(error));
    }
}

export function* watchFetchPosts() {
    while (true) {
        yield take(REQUEST_POSTS);
        yield fork(fetchPosts);
    }
}
