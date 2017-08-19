import { assert } from 'chai';

import * as types from 'app/actions/actionTypes';
import * as postsActions from 'app/actions/postsAction';

describe('posts---action',() => {
    it('onRequestPosts',() => {
        const expectedAction = {
            type: types.REQUEST_POSTS
        };
        assert.deepEqual(postsActions.onRequestPosts(),expectedAction);
    });
    it('onReceivePosts',() => {
        const expectedAction = {
            type: types.RECEIVE_POSTS,
            posts: [],
            receiveAt: '00:00:00',
        };
        assert.deepEqual(postsActions.onReceivePosts([],'00:00:00'),expectedAction);
    });
    it('onRequestPostsFailed',() => {
        const expectedAction = {
            type: types.REQUEST_POSTS_FAILED,
            error: 'error',
        };
        assert.deepEqual(postsActions.onRequestPostsFailed('error'),expectedAction);
    });
});
