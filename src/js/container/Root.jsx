import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

import routes from './../routes';

/* eslint-disable */ 
import 'styles/normalize.scss';
import 'styles/font.scss';
import 'styles/app.scss';
import 'styles/animation.scss';
/* eslint-disable */ 

const Root = (props) => {
    return (
        <Provider store={props.store}>
            <Router history={props.history} routes={routes} />
        </Provider>
    );
};

export default Root;
