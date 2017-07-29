import React from 'react';
import classnames from 'classnames';
import styles from './index.scss';

export default class TextInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: this.props.text || ''
        }
    }

    componentDidMount(){
        this.input.focus();
    }

    handlerChange = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    handlerSubmit = (val) => {
        this.props.onSave(val.trim());
        this.props.newTodo && this.setState({
            value: ''
        });
    }

    handlerBlur = (e) => {
        if(!this.props.newTodo){
            this.props.onSave(e.target.value);
        }
    }

    render(){
        const {onSave,newTodo,placeholder,text} = this.props;
        return (
            <div className={classnames({
                [styles.root]: newTodo
            })}>
                <input 
                    type="text"
                    ref = {input => this.input = input}
                    value = {this.state.value}
                    className = {classnames({
                        [styles.editor]: !newTodo,
                        [styles.input]: true
                    })}
                    onChange = {this.handlerChange}
                    onBlur = {this.handlerBlur}
                    placeholder={placeholder}
                />
                {
                    newTodo && 
                    <button
                        className={styles.btn}
                        onClick={() => this.handlerSubmit(this.input.value)}
                    >
                        +
                    </button>
                }
            </div>
        )
    }
}