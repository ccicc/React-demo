import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import {assert} from 'chai';
import {shallow,mount} from 'enzyme';

import {FooterNav} from 'app/components';

    describe('<FooterNav />',() => {
        const wrapper = mount(<FooterNav/>);  

        it('should render correctly',() => {
            assert.strictEqual(wrapper.hasClass('fixed-bottom'),true);
            assert.strictEqual(wrapper.children('NavLink').length,4);
            assert.strictEqual(wrapper.childAt(0).props().onlyActiveOnIndex,true);

            wrapper.children('NavLink').forEach((node) => {
                assert.exists(node.props().pathUrl);
                assert.exists(node.props().linkName);
                assert.exists(node.props().iconName);
                assert.exists(node.props().activeName);
                assert.strictEqual(node.children().length,2);
                assert.strictEqual(node.childAt(0).name(),'i');
                assert.strictEqual(node.childAt(1).name(),'span');
            });
        });
    });
