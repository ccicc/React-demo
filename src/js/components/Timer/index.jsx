import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

import styles from './index.scss';

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { seconds, status } = this.props;
        const classes = classNames({
            [`${styles.status}`]: true,
            [`${styles.start}`]: status === 'staring',
            [`${styles.stop}`]: status !== 'staring'
        });
        return (
            <div className={styles.root}>
                <p className={styles.timer}>
                    {moment(seconds * 1000).format('mm:ss')}
                    <span className={classes}>{status}</span>
                </p>
                <button 
                    onClick={this.props.onStart} 
                    className={styles.btn}
                    disabled={status === 'staring'}
                >开始</button>
                <button 
                    onClick={this.props.onStop} 
                    className={styles.btn}
                    disabled={status !== 'staring'}
                >停止</button>
                <button 
                    onClick={this.props.onReset}
                    className={styles.btn}
                    disabled={status === 'reset'}
                >重置</button>
            </div>
        );
    }
}

Timer.propTypes = {
    seconds: propTypes.number.isRequired,
    status: propTypes.string.isRequired,
    onStart: propTypes.func.isRequired,
    onStop: propTypes.func.isRequired,
    onReset: propTypes.func.isRequired
};
