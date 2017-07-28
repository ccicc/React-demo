import React from 'react';
import classnames from 'classnames';
import styles from './index.scss';

class TodoItem extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        const {todo,onTodoCompleted} = this.props;
        let element;
        element = (
            <div>
                <input 
                    type="checkbox"
                    checked = {todo.completed}
                    onChange = {() => onTodoCompleted(todo.id)}
                    className = {classnames({
                        [styles.toggle]: true
                    })}
                />
                <label
                    onClick = {() => onTodoCompleted(todo.id)}
                    className = {classnames({
                        [styles.text]: true,
                        [styles.completed]: todo.completed,
                        "text-overflow": true
                    })}
                >
                    <span className={classnames({
                        [styles.content]: true,
                        [styles.contentCompleted]: todo.completed
                    })}>{todo.content}</span>
                </label>
            </div>
        );

        return (
            <li className={styles.root}>
                {element}
            </li>
        )
    }
}

export default TodoItem;