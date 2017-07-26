import React from 'react';
import propTypes from 'prop-types';

export default class Counter extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {sum,timeout,onIncrement,onDecrement,onAsyncIncrement} = this.props;
        return (
            <div>
                <p>{sum}</p>
                <button onClick={onIncrement}>加1</button>
                <button onClick={onDecrement}>减1</button>
                <button onClick={sum % 2 === 0 ? onIncrement : null}>even</button>
                <p>{timeout}</p>
                <button onClick={onAsyncIncrement}>async</button>
            </div>
        )
    }
}

Counter.propTypes = {
    sum: propTypes.number.isRequired,
    timeout: propTypes.number.isRequired,
    onIncrement: propTypes.func.isRequired,
    onDecrement: propTypes.func.isRequired,
    onAsyncIncrement: propTypes.func.isRequired
};