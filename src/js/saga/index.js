import { fork } from 'redux-saga/effects';
import { watchTimer } from './timer';
import { watchCounter } from './counter';

export default function* rootSaga() {
    yield [
        fork(watchTimer),
        fork(watchCounter)
    ];
}
