import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FooterNav, Posts } from './../../components';

import * as postsActions from './../../actions/postsAction';

class Async extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { state, postsActionCreators } = this.props;
        return (
            <div className="wrapper">
                <Posts
                    {...state}
                    {...postsActionCreators}
                />
                <FooterNav />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: state.posts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        postsActionCreators: bindActionCreators(postsActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Async);
