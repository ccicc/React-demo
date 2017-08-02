import React from 'react';
import {
    Route,
    IndexRoute
} from 'react-router';

import {
    App,
    Simple,
    General,
    Complex,
    Async
} from './container';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Simple} />
        <Route path="/general" component={General} />
        <Route path="/Complex" component={Complex} />
        <Route path="/async" component={Async} />
    </Route>
);
