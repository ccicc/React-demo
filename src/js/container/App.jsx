import React from 'react';
import propTypes from 'prop-types';

const App = (props) => {
    const children = props.children;
    return children;
};

App.propTypes = {
    children: propTypes.element.isRequired
}

export default App;