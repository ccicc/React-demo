import React from 'react';
import propTypes from 'prop-types';
import styles from './index.scss';

import Header from './Header';
import MainSection from './MainSection';

export default class Todo extends React.Component {
    onClearSelected = () => {
        const { todoActions, todoItems } = this.props;
        todoItems.filter(item => item.completed).forEach(item =>
            todoActions.onTodoDelete(item.id),
        );
    }

    onCompletedAll = () => {
        const { todoItems, todoActions } = this.props;
        todoItems.forEach(item =>
            todoActions.onTodoCompleted(item.id)
        );
    }

    render() {
        const { todoItems, todoActions, todoShow } = this.props;
        const selectedItems = todoItems.filter(item => item.completed).length;
        return (
            <div className={styles.root}>
                <div className={styles.wrap}>
                    <Header
                        onTodoAdd={todoActions.onTodoAdd}
                    />
                    <MainSection
                        todoItems={todoItems}
                        todoShow={todoShow}
                        todoActions={todoActions}
                        selectedItems={selectedItems}
                        onClearSelected={this.onClearSelected}
                        onCompletedAll={this.onCompletedAll}
                    />
                </div>
            </div>
        );
    }
}

Todo.propTypes = {
    todoItems: propTypes.array.isRequired,
    todoActions: propTypes.object.isRequired,
    todoShow: propTypes.string.isRequired
};
