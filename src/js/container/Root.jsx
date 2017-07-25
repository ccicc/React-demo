import React from 'react';
import {Router} from 'react-router';
import {Provider} from 'react-redux';

import routes from './../routes';

import 'styles/normalize.scss';
import 'styles/font.scss';
import 'styles/app.scss';

const Root = (props) => {
    return (
        <Provider store={props.store}>
            <Router history={props.history} routes={routes} />
        </Provider>
    )
};

export default Root;