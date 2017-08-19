import { assert } from 'chai';

import * as types from 'app/actions/actionTypes';
import * as postsActions from 'app/actions/postsAction';
import posts from 'app/reducers/posts';

describe('posts_reducer',() => {
    it('return posts initial state',() => {
        assert.deepEqual(
            posts(undefined,{}),
            {
                isFetching: false,
                items: []
            }
        );
    });
    it('REQUEST_POSTS',() => {
        assert.deepEqual(
            posts(undefined, postsActions.onRequestPosts()),
            {
                items: [],
                isFetching: true
            }
        );
    });
    it('RECEIVE_POSTS',() => {
        assert.deepEqual(
            posts(undefined,postsActions.onReceivePosts([],'00:00:00')),
            {
                items: [],
                isFetching: false,
                lastUpdate: '00:00:00'
            }
        );
    });
    it('REQUEST_POSTS_FAILED',() => {
        assert.deepEqual(
            posts(undefined,postsActions.onRequestPostsFailed('error')),
            {
                items: [],
                isFetching: false,
                error: 'error',
            }
        );
    });
});
