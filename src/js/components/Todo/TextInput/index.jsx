import React from 'react';
import classNames from 'classnames';
import styles from './index.scss';

export default class TextInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: ''
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
        this.setState({
            value: ''
        })
    }

    render(){
        const {onSave} = this.props;
        return (
            <div className={styles.root}>
                <input 
                    type="text"
                    ref = {input => this.input = input}
                    value = {this.state.value}
                    className={styles.input}
                    onChange={this.handlerChange}
                    placeholder="输入待办事项"
                />
                <button
                    className={styles.btn}
                    onClick={() => this.handlerSubmit(this.input.value)}
                >
                    +
                </button>
            </div>
        )
    }
}