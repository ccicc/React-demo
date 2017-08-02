import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as countActionCreators from './../../actions/CounterAction';

import { FooterNav, Counter } from './../../components';

class General extends React.Component {
    render() {
        const { stateCount, stateCountAsync, countActions } = this.props;
        return (
            <div className="wrapper">
                <Counter {...stateCount} {...countActions} {...stateCountAsync}/>
                <FooterNav/>
            </div>
        );
    }
}

General.propTypes = {
    stateCount: propTypes.object.isRequired,
    countActions: propTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        stateCount: state.counter,
        stateCountAsync: state.counterAsync
    };
}

function mapDispatchToProps(dispatch) {
    return {
        countActions: bindActionCreators(countActionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(General);
