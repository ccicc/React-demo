import { assert } from 'chai';
import moment from 'moment';

import {
    take,
    put,
    fork,
    call
} from 'redux-saga/effects';

import { cloneableGenerator } from 'redux-saga/utils';

import * as types from 'app/actions/actionTypes';
import * as postsActions from 'app/actions/postsAction';
import {
    watchFetchPosts,
    fetchPosts,
    fetchPostsApi
} from 'app/saga/posts';

describe('posts---saga',() => {
    it('watchFetchPosts',() => {
        const gen = watchFetchPosts();
        let next = gen.next();
        assert.deepEqual(next.value,take(types.REQUEST_POSTS));
        next = gen.next(postsActions.onRequestPosts());
        assert.deepEqual(next.value,fork(fetchPosts));
    });

    it.only('fetchPosts',() => {
        const data = {};
        data.gen = cloneableGenerator(fetchPosts)();
        data.clone = data.gen.clone();

        assert.deepEqual(
            data.gen.next().value,
            call(fetchPostsApi)
        );
        const result = fetchPostsApi();
        const receiveAt = moment().format('HH:mm:ss');
        assert.deepEqual(
            data.gen.next(result).value,
            put(postsActions.onReceivePosts(result,receiveAt))
        );

        // 请求失败的测试
        assert.deepEqual(
            data.clone.next().value,
            call(fetchPostsApi)
        );
        const error = new Error('error');
        assert.deepEqual(
            data.clone.throw(error).value,
            put(postsActions.onRequestPostsFailed(error))
        );
    });
});
