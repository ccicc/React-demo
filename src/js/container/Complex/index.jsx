import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

import { FooterNav, Todo } from './../../components';
import * as todoActionCreators from './../../actions/TodoAction';

class Complex extends React.Component {
    render() {
        const { todoItems, todoShow, todoActions } = this.props;
        return(
            <div className="wrapper">
                <Todo 
                    todoItems = {todoItems}
                    todoShow = {todoShow}
                    todoActions = {todoActions}
                />
                <FooterNav/>
            </div>
        );
    }
}

const getTodoItems = (state) => state.todo.todoItems;
const getTodoShow = (state) => state.todo.todoShow;
const showTodoFilter = createSelector(
    [ getTodoItems, getTodoShow ],
    (todoItems, todoShow) => {
        switch(todoShow) {
            case 'SHOW_ALL':
                return todoItems;
            case 'SHOW_COMPLETED':
                return todoItems.filter(item => item.completed);
            case 'SHOW_ACTIVE':
                return todoItems.filter(item => !item.completed);
            default:
                return todoItems;
        }
    }
);

function mapStateToProps(state) {
    return {
        todoItems: showTodoFilter(state),
        todoShow: state.todo.todoShow
    };
}

function mapDispatchToProps(dispatch) {
    return {
        todoActions: bindActionCreators(todoActionCreators, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Complex);
