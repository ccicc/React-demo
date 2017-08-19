import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import styles from './index.scss';

export default class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.text || ''
        };
    }

    componentDidMount() {
        this.input.focus();
    }

    handlerChange = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    handlerSubmit = () => {
        this.props.onSave(this.state.value.trim());
        this.props.newTodo && this.setState({
            value: ''
        });
    }

    handlerBlur = (e) => {
        if (!this.props.newTodo) {
            this.props.onSave(e.target.value);
        }
    }

    render() {
        const { newTodo, placeholder } = this.props;
        return (
            <div className={classnames({
                [styles.root]: newTodo
            })}
            >
                <input
                    type="text"
                    ref={input => this.input = input}
                    value={this.state.value}
                    className={classnames({
                        [styles.editor]: !newTodo,
                        [styles.input]: true
                    })}
                    onChange={this.handlerChange}
                    onBlur={this.handlerBlur}
                    placeholder={placeholder}
                />
                {
                    newTodo &&
                    <button
                        className={styles.btn}
                        onClick={() => this.handlerSubmit()}
                    >
                        +
                    </button>
                }
            </div>
        );
    }
}

TextInput.propTypes = {
    placeholder: propTypes.string,
    text: propTypes.string,
    newTodo: propTypes.bool,
    onSave: propTypes.func.isRequired
};
