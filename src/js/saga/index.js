import { fork } from 'redux-saga/effects';
import { watchTimer } from './timer';
import { watchCounter } from './counter';
import { watchFetchPosts } from './posts';

export default function* rootSaga() {
    yield [
        fork(watchTimer),
        fork(watchCounter),
        fork(watchFetchPosts),
    ];
}
