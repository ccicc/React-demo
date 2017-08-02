import { createStore, applyMiddleware, compose } from 'redux';

import createLogger from 'redux-logger';
// import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './../reducers';

const configureStore = (preloadedState) => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(sagaMiddleware, createLogger)
        ),
    );
    store.runSaga = sagaMiddleware.run;
    return store;
};

export default configureStore;
