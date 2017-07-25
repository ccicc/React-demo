import {fork} from 'redux-saga/effects'
import {watchTimer} from './timer';

export default function* rootSaga(){
    yield [
        fork(watchTimer)
    ]
}