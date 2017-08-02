import React from 'react';
import propTypes from 'prop-types';
import styles from './index.scss';

export default class Counter extends React.Component {
    render() {
        const {
            sum, timeout, asyncBool,
            onIncrement, onDecrement, onAsyncIncrement,
        } = this.props;

        return (
            <div className={styles.root}>
                <div className={styles.wrapper}>
                    <h1 className={styles.sum}>{sum}</h1>
                    <div>
                        <button
                            onClick={onIncrement}
                            className={styles.increment}
                        >+</button>
                        <button
                            onClick={onDecrement}
                            className={styles.decrement}
                        >-</button>
                    </div>
                    <div>
                        <button
                            onClick={sum % 2 === 0 ? onIncrement : null}
                            className={styles.even}
                        >偶数+1</button>
                    </div>
                    <div>
                        <button
                            onClick={onAsyncIncrement}
                            className={styles.async}
                            disabled={asyncBool}
                        >
                            {timeout}秒后+1
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Counter.propTypes = {
    sum: propTypes.number.isRequired,
    timeout: propTypes.number.isRequired,
    asyncBool: propTypes.bool.isRequired,
    onIncrement: propTypes.func.isRequired,
    onDecrement: propTypes.func.isRequired,
    onAsyncIncrement: propTypes.func.isRequired,
};
