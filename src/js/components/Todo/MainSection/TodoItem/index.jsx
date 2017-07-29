import React from 'react';
import classnames from 'classnames';
import styles from './index.scss';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';
import touchFunc from './../touchFunc';

import TextInput from './../../TextInput';

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            btnsShow: false,
            editorBool: false
        }
    }

    componentDidMount() {
        // 绑定滑动事件
        touchFunc(this.label, 'left', this.handlerLeft);
    }

    componentDidUpdate() {
        this.label && touchFunc(this.label, 'left', this.handlerLeft);
    }

    handlerLeft = () => {
        this.setState({btnsShow: true})
    }

    handlerCancel = () => {
        this.setState({btnsShow: false})
    }

    handlerEditor = () => {
        this.setState({editorBool: true, btnsShow: false})
    }

    handlerSave = (text, id) => {
        if (text.length === 0) {
            this
                .props
                .onTodoDelete(id);
        } else {
            text !== this.props.todo.content &&
            this.props.onTodoEditor(id,text);
        }
        this.setState({editorBool: false})
    }

    render() {
        let element;
        const {todo, onTodoCompleted, onTodoDelete, onTodoAdd} = this.props;
        const {btnsShow, editorBool} = this.state;

        if (editorBool) {
            element = (<TextInput
                onSave=
                {(text) => this.handlerSave(text,todo.id)}
                text={todo.content}/>);
        } else {
            element = (
                <div>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange=
                        {() => onTodoCompleted(todo.id)}
                        className={classnames({
                        [styles.toggle]: true
                    })}/>
                    <label
                        ref=
                        {label => this.label = label}
                        onClick=
                        {() => onTodoCompleted(todo.id)}
                        className={classnames({
                        [styles.text]: true,
                        [styles.completed]: todo.completed,
                        "text-overflow": true
                    })}>
                        <span
                            className={classnames({
                            [styles.content]: true,
                            [styles.contentCompleted]: todo.completed
                        })}>
                            {todo.content}
                        </span>
                    </label>
                    <ReactCssTransitionGroup
                        transitionName="todoItemBtns"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>
                        {btnsShow && <div key={todo.id} className={styles.btns}>
                            <button className={styles.deleteBtn} onClick= {() => onTodoDelete(todo.id)}>
                                删除
                            </button>
                            <button className={styles.editorBtn} onClick={this.handlerEditor}>
                                编辑
                            </button>
                            <button className={styles.cancelBtn} onClick={this.handlerCancel}>
                                取消
                            </button>
                        </div>
}
                    </ReactCssTransitionGroup>
                </div>
            );
        }

        return (
            <ReactCssTransitionGroup
                component="li"
                transitionName="todoItem"
                transitionAppear={true}
                transitionAppearTimeout={300}
                transitionEnter={false}
                transitionLeave={false}>
                <div className={styles.root} key={todo.id}>
                    {element}
                </div>
            </ReactCssTransitionGroup>
        )
    }
}

export default TodoItem;