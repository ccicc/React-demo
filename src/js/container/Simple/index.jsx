import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TimerActionCreators from './../../actions/TimerAction';


import { FooterNav, Timer } from './../../components';

class Simple extends React.Component {
    render() {
        const {
            actionsTimer,
            stateTimer,
        } = this.props;
        return (
            <div className="wrapper">
                <Timer
                    {...stateTimer}
                    {...actionsTimer}
                />
                <FooterNav />
            </div>
        );
    }
}

Simple.propTypes = {
    actionsTimer: propTypes.object.isRequired,
    stateTimer: propTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        stateTimer: state.timer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionsTimer: bindActionCreators(TimerActionCreators, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Simple);
