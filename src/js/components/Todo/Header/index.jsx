import React from 'react';
import propTypes from 'prop-types';
import styles from './index.scss';

import TextInput from './../TextInput';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    handlerSave = (text) => {
        if(text.length !== 0) {
            this.props.onTodoAdd(text);
        }
    }

    render() {
        return (
            <div className={styles.root}>
                <h1 className={styles.title}>记事本</h1>
                <TextInput
                    newTodo
                    onSave = {this.handlerSave}
                    placeholder = "输入待办事项"
                />
            </div>
        );
    }
}

Header.propTypes = {
    onTodoAdd: propTypes.func.isRequired
};
