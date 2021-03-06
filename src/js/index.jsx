import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

import Root from './container/Root';
import configureStore from './store';
import rootSaga from './saga';

const store = configureStore({});
store.runSaga(rootSaga);

ReactDOM.render(
    <Root history={browserHistory} store={store} />,
    document.querySelector('#root'),
);
